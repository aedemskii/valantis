import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TItemsFilterParams } from '../assets/types';

export const useFilterParams = (): {
  filterParams: TItemsFilterParams, 
  setFilterParams: (params: TItemsFilterParams) => void,
  updateFilterParams: (params: TItemsFilterParams) => void,
  clearFilterParams: () => void
} => {
  const [ searchParams, setSearchParams ] = useSearchParams({});

  let [ page, setPage ] = useState<number>(searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1);
  let [ product, setProduct ] = useState<string|null>(searchParams.get('product') || null);
  let [ brand, setBrand ] = useState<string|null>(searchParams.get('brand') || null);
  let [ price, setPrice ] = useState<number|null>(searchParams.get('price') ? parseInt(searchParams.get('price')!) : null);

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
      if (params.page) {
        prev.set('page', params.page.toString());
        setPage(params.page);
      } else {
        prev.delete('page');
        setPage(1);
      }
      return prev;
    }, { replace: true });
  };

  const updateFilterParams = (params: TItemsFilterParams) => {
    setSearchParams(prev => {
      if (params.product) {
        prev.set('product', params.product);
        setProduct(params.product)
      }
      if (params.brand) {
        prev.set('brand', params.brand);
        setBrand(params.brand);
      }
      if (params.price) {
        prev.set('price', params.price.toString());
        setPrice(params.price);
      }
      if (params.page) {
        prev.set('page', params.page.toString());
        setPage(params.page);
      }
      return prev;
    }, { replace: true });
  };

  const clearFilterParams = () => {
    setSearchParams(prev => {
      prev.delete('product');
      prev.delete('brand');
      prev.delete('price');
      prev.delete('page');
      setProduct(null);
      setBrand(null);
      setPrice(null);
      setPage(1);
      return prev;
    });
  };

  return {
    filterParams: {
      product,
      brand,
      price,
      page,
    },
    setFilterParams: setFilterParams,
    updateFilterParams: updateFilterParams,
    clearFilterParams: clearFilterParams,
  };
};
