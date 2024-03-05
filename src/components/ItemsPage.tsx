import { FilterPanel } from './FilterPanel';
import { ItemsList } from './ItemsList';
import { PaginationPanel } from './PaginationPanel';
import { ITEMS_PER_PAGE } from '../assets/consts';
import { useFilterParams } from '../hooks/useFilterParams';
import { usePagination } from '../hooks/usePagination';
import { useProductList } from '../hooks/useProductList';
import '../styles/ItemsPage.css';

export const ItemsPage = () => {
  const [ filterParams, setFilterParams ] = useFilterParams();
  const [ page, setPage ] = usePagination();
  const { items, loading, error } = useProductList(filterParams, page);

  return (
    <div className='items-page-container'>
      <FilterPanel 
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      {
        loading ? 
          <div className='items-list-loading'>Loading...</div>
        : error ?
          <div className='items-list-error'>{error}</div>
        : items.length &&
          <>
            <ItemsList
              items={items}
              numerationStart={(page - 1) * ITEMS_PER_PAGE + 1}
            />
            <PaginationPanel
              currentPage={page}
              totalItems={items.length}
              offset={ITEMS_PER_PAGE}
              setPage={setPage}
            />
          </>
      }
    </div>
  );
};