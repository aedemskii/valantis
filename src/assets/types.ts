export type TItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
};

export type TItemsFilterParams = {
  name?: string | null;
  brand?: string | null;
  price?: number | null;
  page?: number;
};