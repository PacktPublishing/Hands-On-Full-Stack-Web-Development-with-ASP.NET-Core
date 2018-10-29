using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using GiveNTake.Infrastructure.CorrelationID;
using GiveNTake.Infrastructure.UnhandledExceptions;
using GiveNTake.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace GiveNTake
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // requires: using Microsoft.AspNetCore.Authorization;
            //           using Microsoft.AspNetCore.Mvc.Authorization;
            services.AddMvc(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
                config.Filters.Add<GlobalExceptionFilter>();
            });

            services.AddDbContext<GiveNTakeContext>(options => options.UseSqlServer(Configuration.GetConnectionString("GiveNTakeDB")));
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<GiveNTakeContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(option =>
                {
                    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(jwtOptions =>
                {
                    jwtOptions.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateActor = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidIssuer = Configuration["JWTConfiguration:Issuer"],
                        ValidAudience = Configuration["JWTConfiguration:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWTConfiguration:SigningKey"]))

                    };
                });

            services.AddAuthorization(options => options.AddPolicy("ExperiencedUser", (AuthorizationPolicyBuilder policy) =>
                policy.RequireAssertion(context =>
                {
                    var registrationClaimValue = context.User.Claims.SingleOrDefault(c=>c.Type=="registration-date")?.Value;
                    if (DateTime.TryParseExact(registrationClaimValue, "yy-MM-dd",CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal,out var registrationTime))
                    {
                        return registrationTime.AddYears(1) < DateTime.UtcNow;
                    }
                    return false;
                })));
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "GiveNTake.API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Name = "Authorization",
                    In = "header",
                });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer", new string[] { } }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseDefaultFiles();
            app.UseCors(b =>
            {
                b.AllowAnyHeader();
                b.AllowAnyOrigin();
                b.AllowAnyMethod();
            });
            FileExtensionContentTypeProvider provider = new FileExtensionContentTypeProvider();

            provider.Mappings[".ts"] = "application/x-typescript";
            StaticFileOptions staticFileOptions = new StaticFileOptions()
            {
                ContentTypeProvider = provider
            };

            app.UseStaticFiles();
           

            // Each response will include a 'X-Correlation-ID' header 
            app.UseCorrelationIdHeader();

            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes
                    .MapRoute(name: "default", template: "{controller=Home}/{action=Index}/{id?}")
                    .MapRoute(
                        name: "api",
                        template: "api/{controller=Messages}/{action=My}/{id:int?}");
            });

            var appInsightsLogLevel = Configuration.GetValue<LogLevel>("Logging:Application Insights:LogLevel:Default");
            loggerFactory.AddApplicationInsights(app.ApplicationServices,(s,level)=> { return level >= LogLevel.Warning; });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "GiveNTake.API");
            });

        }

    }
}
