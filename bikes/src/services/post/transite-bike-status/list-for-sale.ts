import { transitionBikeStatus } from './transition-bike-status.js';

type Props = {
  ownerId: string;
  bikeId: string;
  body: Record<string, number>;
};

export async function listBikeForSale({ bikeId, body, ownerId }: Props) {
  await transitionBikeStatus({
    actorId: ownerId,
    allowedStatuses: ['active'],
    bikeId,
    eventType: 'BIKE_REPORTED_FOR_SALE',
    newStatus: 'for_sale',
    details: JSON.stringify(body),
  });
}
