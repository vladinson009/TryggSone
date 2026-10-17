import { transitionBikeStatus } from '../bike-status-service.js';

type Props = {
  ownerId: string;
  bikeId: string;
  body: Record<string, string | Date>;
};

export async function reportRecoveredBike({ bikeId, body, ownerId }: Props) {
  await transitionBikeStatus({
    actorId: ownerId,
    allowedStatuses: ['stolen'],
    bikeId,
    eventType: 'BIKE_REPORTED_RECOVERED',
    newStatus: 'active',
    details: JSON.stringify(body),
  });
}
