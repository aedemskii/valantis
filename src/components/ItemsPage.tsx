import { FilterPanel } from './FilterPanel';
import { ItemsList } from './ItemsList';
import { PaginationPanel } from './PaginationPanel';
import './ItemsPage.css';

export const ItemsPage = () => {

  return (
    <div className='items-page-container'>
      <FilterPanel />
      <ItemsList />
      <PaginationPanel />
    </div>
  );
};