import { useState } from "react";
import { TItemsFilterParams } from "../assets/types";

export const FilterPanel = (
  { setFilterParams } : {
    setFilterParams: (item: TItemsFilterParams) => void
  }) => {
  const [name, setName] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const clearPanel = () => {
    setName('');
    setBrand('');
    setPrice('');
  };

  const handleClick = () => {
    const params: TItemsFilterParams = {};
    if (name !== '')
      params.name = name;
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
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setName('')}>Clear Name</button>
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