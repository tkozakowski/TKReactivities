using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Profile>>
        {
            private readonly DataContext _dbContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dbContext, IMapper mapper)
            {
                _mapper = mapper;
                _dbContext = dbContext;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _dbContext.Users
                    .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null) return null;

                return Result<Profile>.Success(user);
            }
        }
    }
}