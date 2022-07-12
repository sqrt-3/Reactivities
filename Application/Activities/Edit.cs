using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
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
}