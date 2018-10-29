using System.Threading.Tasks;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Http;

namespace GiveNTake.Infrastructure.CorrelationID
{
    public class CorrelationIdHeaderMiddleware
    {
        private const string CorrelationHeaderKey = "X-Correlation-ID";

        private readonly RequestDelegate _next;

        public CorrelationIdHeaderMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Retrieve the current Application Insight Telemtry object for the request
            var requestTelemetry = context.Features.Get<RequestTelemetry>();

            // Register to be notified when the headers are written to the response
            context.Response.OnStarting(_ =>
            {
                // Add the Correlation ID header when the response is being written 
                context.Response.Headers.Add(CorrelationHeaderKey, new[] { requestTelemetry.Id });
                return Task.CompletedTask;
            }, null);

            // Continue the execution pipeline
            await _next(context);
        }
    }
}
