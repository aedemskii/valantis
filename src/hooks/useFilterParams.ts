import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TItemsFilterParams } from '../assets/types';

export const useFilterParams = (): [
  TItemsFilterParams,
  (params: TItemsFilterParams) => void
 ] => {
  const [ searchParams, setSearchParams ] = useSearchParams({});

  const [ product, setProduct ] = useState<string|null>(searchParams.get('product') || null);
  const [ brand, setBrand ] = useState<string|null>(searchParams.get('brand') || null);
  const [ price, setPrice ] = useState<number|null>(searchParams.get('price') ? parseInt(searchParams.get('price')!) : null);

  const setFilterParams = (params: TItemsFilterParams) => {
    setSearchParams(prev => {
      if (params.product) {
        prev.set('product', params.product);
        setProduct(params.product)
      } else {
        prev.delete('product');
        setProduct(null);
      }
      if (params.brand) {
        prev.set('brand', params.brand);
        setBrand(params.brand);
      } else {
        prev.delete('brand');
        setBrand(null);
      }
      if (params.price) {
        prev.set('price', params.price.toString());
        setPrice(params.price);
      } else {
        prev.delete('price');
        setPrice(null);
      }
      return prev;
    }, { replace: true });
  };

  return [
    {
      product,
      brand,
      price
    },
    setFilterParams,
  ];
};
