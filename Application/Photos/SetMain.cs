using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dbContext;
             private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dbContext, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dbContext = dbContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dbContext.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var newMainPhoto = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (newMainPhoto == null) return null;

                var existingMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);

                if (existingMainPhoto != null) existingMainPhoto.IsMain = false;

                newMainPhoto.IsMain = true;
                
                _dbContext.Photos.Update(newMainPhoto);
                
                var success = await _dbContext.SaveChangesAsync() > 0;

                if(success)  return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem setting main photo");
            }
        }
    }
}