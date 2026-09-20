import { BIKES_EXCHANGE, TopicListener, bikeKey } from '@tryggsone/common';
import { bikesEventBus } from '../connection.js';

type BikeHandler = (payload: unknown) => void | Promise<void>;

const handlers: Record<string, BikeHandler> = {
  [bikeKey('created')]: async (payload) => {
    console.log('bike created:', payload);
  },
  [bikeKey('updated')]: async (payload) => {
    console.log('bike updated:', payload);
  },
  [bikeKey('deleted')]: async (payload) => {
    console.log('bike deleted:', payload);
  },
};

const bikeListener = new TopicListener({
  exchange: BIKES_EXCHANGE,
  exchangeType: 'topic',
  queuePrefix: 'q.bff.bikes',
  routingKeys: Object.keys(handlers),
  onMessage: async (routingKey, payload) => {
    const handler = handlers[routingKey];
    if (!handler) {
      console.warn('Unhandled bike routing key:', routingKey);
      return;
    }
    await handler(payload);
  },
});

export async function registerBikeListeners(): Promise<void> {
  const channel = await bikesEventBus.getChannel();
  await bikeListener.register(channel);
}
