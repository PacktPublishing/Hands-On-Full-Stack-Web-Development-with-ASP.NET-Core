using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GiveNTake.Model;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace GiveNTake
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuiler(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetService<GiveNTakeContext>();
                var roleManager = services.GetService<RoleManager<IdentityRole>>();
                try
                {
                    context.Database.Migrate();
                    context.SeedData();
                    context.SeedRolesAsync(roleManager).Wait();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the GiveNTake Database.");
                    throw;
                }

                
            }
                

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuiler(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseApplicationInsights()
                .UseStartup<Startup>();
    }
}
