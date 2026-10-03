import { BIKES_EXCHANGE, TopicListener } from '@tryggsone/common/events';
import { bikeKey } from '@tryggsone/common/keys';
import { bikesEventBus } from '../connection.js';
import { db } from '../../db/index.js';
import { vehicleEventsTable } from '../../db/vehicle-events-schema.js';

const routingKeys = [bikeKey('created'), bikeKey('updated'), bikeKey('deleted')];

const bikeListener = new TopicListener({
  exchange: BIKES_EXCHANGE,
  exchangeType: 'topic',
  queuePrefix: 'q.logger.vehicle',
  routingKeys: routingKeys,
  onMessage: async (routingKey, payload, msg) => {
    if (!routingKeys.some((key) => key === routingKey)) {
      console.warn('Unhandled bike routing key:', routingKey);
      return;
    }

    await db.insert(vehicleEventsTable).values({
      eventId: msg.properties.messageId,
      eventType: routingKey,
      occurredAt: new Date(msg.properties.timestamp),
      correlationId: msg.properties.correlationId,
      data: payload,
    });
  },
});

export async function registerBikeListeners(): Promise<void> {
  const channel = await bikesEventBus.getChannel();
  await bikeListener.register(channel);
}
