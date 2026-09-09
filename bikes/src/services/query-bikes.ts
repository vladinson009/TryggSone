import { db } from '../db/index.js';

export const queryBikes = async () => {
  const bike = await db.query.bikesTable.findMany();
  return bike;
};
