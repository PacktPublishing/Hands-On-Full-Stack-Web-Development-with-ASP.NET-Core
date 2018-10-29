using Microsoft.AspNetCore.Builder;

namespace GiveNTake.Infrastructure.CorrelationID
{
    public static class CorrelationIdMiddlewareExtensions
    {
        public static void UseCorrelationIdHeader(this IApplicationBuilder app)
        {
            app.UseMiddleware<CorrelationIdHeaderMiddleware>();
        }
    }
}