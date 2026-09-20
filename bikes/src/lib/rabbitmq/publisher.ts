import { TopicPublisher, BIKES_EXCHANGE } from '@tryggsone/common';

export const bikePublisher = new TopicPublisher({
  exchange: BIKES_EXCHANGE,
  exchangeType: 'topic',
});
