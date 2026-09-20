import { RABBITMQ_URL } from '../../config/env.js';
import { EventBus } from '@tryggsone/common';

class BikesEventBus extends EventBus {}

export const bikeEventBus = new BikesEventBus({
  serviceName: 'Bike Event Bus',
  url: RABBITMQ_URL,
  initialRetryDelayMs: 5_000,
  maxRetryDelayMs: 20_000,
});
