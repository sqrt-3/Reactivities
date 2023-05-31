using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest
    {
        public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly ReactivityDbContext _context;

        private readonly IMapper _mapper;

        public Handler(ReactivityDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activitiy = await _context.Activities.FindAsync(request.Activity.Id);
            _mapper.Map(request.Activity, activitiy);
            await _context.SaveChangesAsync();
            return Unit.Value;
        }
    }
}