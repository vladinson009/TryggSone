import { appGetBikes } from './get.js';
import { appPostBikes } from './post.js';
import { appPatchBikes } from './patch.js';
import { appDeleteBikes } from './delete.js';
import { Hono } from 'hono';

const app = new Hono()
  .route('/', appGetBikes)
  .route('/', appPostBikes)
  .route('/', appPatchBikes)
  .route('/', appDeleteBikes);

export { app as appBikes };
