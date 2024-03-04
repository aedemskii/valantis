import { FilterPanel } from './FilterPanel';
import { ItemsList } from './ItemsList';
import { PaginationPanel } from './PaginationPanel';
import { ITEMS_PER_PAGE } from '../assets/consts';
import { TItem } from '../assets/types';
import '../styles/ItemsPage.css';

export const ItemsPage = () => {
  const page = 1;
  const items: TItem[] = [];

  const setPage = (page: number) => {
    console.log(page);
  };

  return (
    <div className='items-page-container'>
      <FilterPanel 
        setFilterParams={() => {}}
      />
      <ItemsList items={items} startIndex={(page - 1) * ITEMS_PER_PAGE}/>
      <PaginationPanel
        currentPage={page}
        totalItems={items.length}
        offset={ITEMS_PER_PAGE}
        setPage={setPage}
      />
    </div>
  );
};