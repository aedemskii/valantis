import '../styles/PaginationPanel.css';
import { Button } from './Button';

export const PaginationPanel = (
  { currentPage, totalItems, offset, setPage } : {
    currentPage: number,
    totalItems: number,
    offset: number,
    setPage: (page: number) => void
  }) => {

  const isFirstPage = currentPage === 1;
  const isLastPage = (currentPage * offset) > totalItems;
  const listStart = ((currentPage - 1) * offset) + 1;
  const listFinish = Math.min((currentPage) * offset, totalItems);

  return (
    <div className='items-list-pagination-container'>
      <Button
        onClick={() => setPage(currentPage - 1)}
        disabled={isFirstPage}
      >
        <div className='arrow left' />
      </Button>
      <div>
        {!isFirstPage && <span className='items-list-pagination-ellipsis'>1... </span>}
        <span className='items-list-pagination-current-page'>{`${listStart}-${listFinish}`}</span>
        {!isLastPage && <span className='items-list-pagination-ellipsis'> ...{totalItems}</span>}
      </div>
      <Button
        onClick={() => setPage(currentPage + 1)}
        disabled={isLastPage}
      >
        <div className='arrow right' />
      </Button>
    </div>
  );
}