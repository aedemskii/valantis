import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TItemsFilterParams } from '../assets/types';

export const useFilterParams = (): [
  TItemsFilterParams,
  (params: TItemsFilterParams) => void
 ] => {
  const [ searchParams, setSearchParams ] = useSearchParams({});

  const [ filterParams, setNewFilterParams ] = useState<TItemsFilterParams>({
    product: searchParams.get('product') || null,
    brand: searchParams.get('brand') || null,
    price: searchParams.get('price') ? parseInt(searchParams.get('price')!) : null,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
  });

  const setFilterParams = (params: TItemsFilterParams) => {
    setSearchParams(prev => {
      if (params.product) {
        prev.set('product', params.product);
      } else {
        prev.delete('product');
      }
      if (params.brand) {
        prev.set('brand', params.brand);
      } else {
        prev.delete('brand');
      }
      if (params.price) {
        prev.set('price', params.price.toString());
      } else {
        prev.delete('price');
      }
      if (params.page && params.page !== 1) {
        prev.set('page', params.page.toString());
      } else {
        prev.delete('page');
      }
      return prev;
    }, { replace: true });
    setNewFilterParams(params);
  };

  return [
    filterParams,
    setFilterParams,
  ];
};
