export type BikesForSale = {
  id: string;
  ownerId: string;
  description: string | null;
  status: 'active' | 'for_sale' | 'stolen' | 'deleted';
  brand: string;
  model: string;
  isElectric: boolean;
  condition: string;
  price: number;
  updatedAt: Date;
  photo: string | null;
};
