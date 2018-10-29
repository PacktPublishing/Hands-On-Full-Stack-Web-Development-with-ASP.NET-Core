using System;
using Microsoft.AspNetCore.Mvc;

namespace GiveNTake.Infrastructure.APIErrors
{
    public class ErrorDetails : ValidationProblemDetails
    {
        public Exception Exception { get; set; }
    }
}