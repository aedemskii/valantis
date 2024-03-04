import { useState } from "react";
import { TItemsFilterParams } from "../assets/types";

export const FilterPanel = (
  { setFilterParams, clearFilterParams } : {
    setFilterParams: (item: TItemsFilterParams) => void,
    clearFilterParams: () => void
  }) => {
  const [product, setProduct] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const clearPanel = () => {
    setProduct('');
    setBrand('');
    setPrice('');
    clearFilterParams();
  };

  const handleClick = () => {
    const params: TItemsFilterParams = {};
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
        type='text'
        placeholder='Product'
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <button onClick={() => setProduct('')}>Clear Product</button>
      <input
        type='text'
        placeholder='Brand'
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <button onClick={() => setBrand('')}>Clear Brand</button>
      <input
        type='text'
        placeholder='Price'
        value={price}
        onChange={handleNumberInput}
      />
      <button onClick={() => setPrice('')}>Clear Price</button>
      <button
        onClick={clearPanel}>
        Clear All
      </button>
      <button
        onClick={handleClick}
      >
        Filter
      </button>
    </div>
  );
}