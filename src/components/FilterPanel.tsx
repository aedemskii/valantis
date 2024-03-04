import { useState } from "react";
import { TItemsFilterParams } from "../assets/types";

export const FilterPanel = (
  { setFilterParams } : {
    setFilterParams: (item: TItemsFilterParams) => void
  }) => {
  const [name, setName] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const clearPanel = () => {
    setName(null);
    setBrand(null);
    setPrice(null);
  };

  const handleClick = () => {
    const params: TItemsFilterParams = {};
    if (name) params.name = name;
    if (brand) params.brand = brand;
    if (price) params.price = price;
    setFilterParams(params);
  };

  return (
    <div className='items-filter-panel'>
      <input
        type='text'
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Brand'
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        type='number'
        placeholder='Price'
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />
      <button
        onClick={clearPanel}>
        Clear
      </button>
      <button
        onClick={handleClick}
      >
        Filter
      </button>
    </div>
  );
}