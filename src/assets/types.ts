export type TItem = {
  id: string;
  product: string;
  brand: string;
  price: number;
};

export type TItemsFilterParams = {
  product?: string | null;
  brand?: string | null;
  price?: number | null;
};

export type TProductListResult = {
  items: TItem[];
  loading: boolean;
  error: string | null;
};

export type TFetchItemsIdsParams = {
  offset: number;
  limit: number;
  signal?: AbortSignal;
  params?: TItemsFilterParams;
};