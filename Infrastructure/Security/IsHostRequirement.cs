using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
        private readonly DbContext _context;
        public IsHostRequirement(DbContext context)
        {
            _context = context;

        }
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            throw new System.NotImplementedException();
        }
    }
}