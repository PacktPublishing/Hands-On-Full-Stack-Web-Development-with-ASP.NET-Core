using System.Net;
using GiveNTake.Infrastructure.APIErrors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace GiveNTake.Infrastructure.UnhandledExceptions
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly IHostingEnvironment env;
        private readonly ILogger<GlobalExceptionFilter> _logger;

        public GlobalExceptionFilter(IHostingEnvironment env, ILogger<GlobalExceptionFilter> logger)
        {
            this.env = env;
            this._logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(new EventId(context.Exception.HResult),
                context.Exception,
                context.Exception.Message);

            var errorDetails = new ErrorDetails()
            {
                Instance = context.HttpContext.Request.Path,
                Status = StatusCodes.Status500InternalServerError,
                Detail = "Please refer to the errors property for additional details.",
                Errors =
                {
                    {"ServerError", new[] {"An unexpected error ocurred."}}
                },
            };

            if (env.IsDevelopment())
            {
                errorDetails.Exception = context.Exception;
            }

            context.Result = new ObjectResult(errorDetails)
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            context.ExceptionHandled = true;
        }
    }
}