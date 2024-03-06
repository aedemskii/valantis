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
  page: number;
};

export type TItemsFilterParamsForFetch = {
  product?: string;
  brand?: string;
  price?: number;
};

export type TProductListResult = {
  items: TItem[];
  totalItems: number;
  brands: string[];
  loading: boolean;
  error: string | null;
};