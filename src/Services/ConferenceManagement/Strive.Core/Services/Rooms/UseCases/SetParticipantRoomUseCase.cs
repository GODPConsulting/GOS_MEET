using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using Strive.Core.Extensions;
using Strive.Core.Services.Rooms.Gateways;
using Strive.Core.Services.Rooms.Notifications;
using Strive.Core.Services.Rooms.Requests;

namespace Strive.Core.Services.Rooms.UseCases
{
    public class SetParticipantRoomUseCase : IRequestHandler<SetParticipantRoomRequest>
    {
        private readonly IMediator _mediator;
        private readonly IRoomRepository _roomRepository;
        private readonly ILogger<SetParticipantRoomUseCase> _logger;

        public SetParticipantRoomUseCase(IMediator mediator, IRoomRepository roomRepository,
            ILogger<SetParticipantRoomUseCase> logger)
        {
            _mediator = mediator;
            _roomRepository = roomRepository;
            _logger = logger;
        }

        public async Task<Unit> Handle(SetParticipantRoomRequest request, CancellationToken cancellationToken)
        {
            var (participant, roomId) = request;

            _logger.LogDebug("Switch participant {participant} to room {roomId}", participant, roomId);
            await _roomRepository.SetParticipantRoom(participant, roomId);
            await _mediator.Publish(new ParticipantsRoomChangedNotification(participant.ConferenceId,
                participant.Yield().ToList(), false));

            return Unit.Value;
        }
    }
}