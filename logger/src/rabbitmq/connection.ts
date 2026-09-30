import { RABBITMQ_URL } from '../config/env.js';
import { EventBus } from '@tryggsone/common/events';

class BikesEventBus extends EventBus {}

export const bikesEventBus = new BikesEventBus({
  serviceName: 'Bike service',
  url: RABBITMQ_URL,
});
