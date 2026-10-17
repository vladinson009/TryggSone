import { transitionBikeStatus } from '../bike-status-service.js';

type Props = {
  ownerId: string;
  bikeId: string;
  body: Record<string, string | Date>;
};

export async function reportStolenBike({ bikeId, body, ownerId }: Props) {
  await transitionBikeStatus({
    actorId: ownerId,
    allowedStatuses: ['for_sale', 'active'],
    bikeId,
    eventType: 'BIKE_REPORTED_STOLEN',
    newStatus: 'stolen',
    details: JSON.stringify(body),
  });
}
