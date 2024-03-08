import { FilterPanel } from './FilterPanel';
import { ItemsList } from './ItemsList';
import { PaginationPanel } from './PaginationPanel';
import { ITEMS_PER_PAGE } from '../assets/consts';
import { useFilterParams } from '../hooks/useFilterParams';
import { useProductList } from '../hooks/useProductList';
import { TItemsFilterParams } from '../assets/types';
import '../styles/ItemsPage.css';

export const ItemsPage = () => {
  const [ filterParams, setFilterParams ] = useFilterParams();
  const { items, totalItems, brands, loading, error } = useProductList(filterParams);

  const handleSetFilterParams = (params: TItemsFilterParams) => {
    setFilterParams(params);
  };

  const setPage = (page: number) => {
    setFilterParams({ ...filterParams, page });
  };

  return (
    <div className='items-page-container'>
      <FilterPanel
        brands={brands}
        filterParams={filterParams}
        setFilterParams={handleSetFilterParams}
      />
      {
        loading ?
          <div className='items-list-loading'>Loading...</div>
        : error ?
          <div className='items-list-error'>{error}</div>
        : items.length ?
          <>
            <ItemsList
              items={items}
              numerationStart={(filterParams.page - 1) * ITEMS_PER_PAGE + 1}
            />
            <PaginationPanel
              currentPage={filterParams.page}
              totalItems={totalItems}
              offset={ITEMS_PER_PAGE}
              setPage={setPage}
            />
          </>
        : <div className='items-list-no-results'>No results found</div>
      }
    </div>
  );
};