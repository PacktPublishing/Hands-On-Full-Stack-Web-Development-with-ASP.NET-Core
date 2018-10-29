using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace GiveNTake.Model
{
    public class User : IdentityUser
    {
        public IList<Product> Products { get; set; }
    }   
}