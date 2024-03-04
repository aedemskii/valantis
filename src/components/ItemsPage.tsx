import { FilterPanel } from './FilterPanel';
import { ItemsList } from './ItemsList';
import { PaginationPanel } from './PaginationPanel';
import '../styles/ItemsPage.css';

export const ItemsPage = () => {

  return (
    <div className='items-page-container'>
      <FilterPanel />
      <ItemsList items={[]} startIndex={1}/>
      <PaginationPanel />
    </div>
  );
};