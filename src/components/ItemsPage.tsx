import { useState } from 'react';
import { FilterPanel } from './FilterPanel';
import { ItemsList } from './ItemsList';
import { PaginationPanel } from './PaginationPanel';
import { useFilterParams } from '../hooks/useFilterParams';
import { ITEMS_PER_PAGE } from '../assets/consts';
import { TItem } from '../assets/types';
import '../styles/ItemsPage.css';

export const ItemsPage = () => {
  const [ items, setItems ] = useState<TItem[]>([]);
  const {
    filterParams,
    setFilterParams,
    updateFilterParams,
    clearFilterParams
  } = useFilterParams();

  const setPage = (page: number) => {
    updateFilterParams({ page });
  };

  return (
    <div className='items-page-container'>
      <FilterPanel
        setFilterParams={setFilterParams}
        clearFilterParams={clearFilterParams}
      />
      <ItemsList
        items={items}
        numerationStart={((filterParams.page || 1) - 1) * ITEMS_PER_PAGE + 1}
      />
      <PaginationPanel
        currentPage={filterParams.page || 1}
        totalItems={items.length}
        offset={ITEMS_PER_PAGE}
        setPage={setPage}
      />
    </div>
  );
};