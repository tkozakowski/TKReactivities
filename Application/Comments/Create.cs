using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }


        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _dbContext;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext dbContext, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _dbContext = dbContext;

            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _dbContext.Activities.FindAsync(request.ActivityId);

                if(activity == null) return null;

                var user = await _dbContext.AppUsers
                    .Include(u => u.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };

                activity.Comments.Add(comment);

                var success = await _dbContext.SaveChangesAsync() > 0;

                if(success)
                {
                    var commentDto = _mapper.Map<CommentDto>(comment);
                    
                    return Result<CommentDto>.Success(commentDto);
                }

                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}