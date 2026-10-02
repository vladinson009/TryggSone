import { BIKES_EXCHANGE, TopicListener } from '@tryggsone/common/events';
import { bikeKey } from '@tryggsone/common/keys';
import { bikesEventBus } from '../connection.js';
import { db } from '../../db/index.js';
import { vehicleEventsTable } from '../../db/vehicle-events-schema.js';
import type { ConsumeMessage } from 'amqplib';
import type { BikeResponse } from '@tryggsone/common/types';

type BikeHandler = (
  routingKey: string,
  payload: BikeResponse,
  msg: ConsumeMessage,
) => void | Promise<void>;

const handlers: Record<string, BikeHandler> = {
  [bikeKey('created')]: async (routingKey, payload, msg) => {
    console.log('bike created:');
    console.log(msg.properties);

    await db.insert(vehicleEventsTable).values({
      eventId: msg.properties.messageId,
      eventType: routingKey,
      occurredAt: new Date(msg.properties.timestamp ?? payload.createdAt),
      vehicleId: payload.id,
      correlationId: msg.properties.correlationId,
      ownerId: payload.ownerId,
      data: payload,
    });
  },
  [bikeKey('updated')]: async (routingKey, payload, msg) => {
    console.log('bike updated:', payload);
    await db.insert(vehicleEventsTable).values({
      eventId: msg.properties.messageId,
      eventType: routingKey,
      occurredAt: new Date(msg.properties.timestamp ?? payload.updatedAt),
      vehicleId: payload.id,
      correlationId: msg.properties.correlationId,
      ownerId: payload.ownerId,
      data: payload,
    });
  },
  [bikeKey('deleted')]: async (routingKey, payload, msg) => {
    await db.insert(vehicleEventsTable).values({
      eventId: msg.properties.messageId,
      eventType: routingKey,
      occurredAt: new Date(msg.properties.timestamp ?? payload.updatedAt),
      vehicleId: payload.id,
      correlationId: msg.properties.correlationId,
      ownerId: payload.ownerId,
      data: payload,
    });
  },
};

const bikeListener = new TopicListener<BikeResponse>({
  exchange: BIKES_EXCHANGE,
  exchangeType: 'topic',
  queuePrefix: 'q.logger.vehicle',
  routingKeys: Object.keys(handlers),
  onMessage: async (routingKey, payload, msg) => {
    const handler = handlers[routingKey];
    if (!handler) {
      console.warn('Unhandled bike routing key:', routingKey);
      return;
    }
    await handler(routingKey, payload, msg);
  },
});

export async function registerBikeListeners(): Promise<void> {
  const channel = await bikesEventBus.getChannel();
  await bikeListener.register(channel);
}
