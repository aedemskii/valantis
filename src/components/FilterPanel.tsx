import { useEffect, useState } from "react";
import { TItemsFilterParams } from "../assets/types";

export const FilterPanel = (
  {
    brands,
    filterParams,
    setFilterParams
  } : {
    brands: string[],
    filterParams: TItemsFilterParams,
    setFilterParams: (params: TItemsFilterParams) => void
}) => {
  const [product, setProduct] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    setProduct(filterParams.product || '');
    setBrand(filterParams.brand || '');
    setPrice(filterParams.price ? filterParams.price.toString() : '');
  }, [filterParams]);

  const clearPanel = () => {
    setProduct('');
    setBrand('');
    setPrice('');
  };

  const handleFilterClick = () => {
    const params: TItemsFilterParams = { page: 1 };
    if (product !== '')
      params.product = product;
    if (brand !== '')
      params.brand = brand;
    if (price !== '')
      params.price = parseInt(price);
    setFilterParams(params);
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value))
      setPrice(value);
  };

  return (
    <div className='items-filter-panel'>
      <input
        type='search'
        placeholder='Product'
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <>
        <input
          type='search'
          placeholder='Brand'
          list='brands'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <datalist id='brands'>
          {brands.map( (brand, i) => <option key={brand + i} value={brand} />)}
        </datalist>
      </>
      <input
        type='search'
        placeholder='Price'
        value={price}
        onChange={handleNumberInput}
      />
      <button
        onClick={clearPanel}>
        Clear All
      </button>
      <button
        onClick={handleFilterClick}
      >
        Filter
      </button>
    </div>
  );
}