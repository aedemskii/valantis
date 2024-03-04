import '../styles/PaginationPanel.css';

export const PaginationPanel = (
  { currentPage, totalItems, offset, setPage } : {
    currentPage: number,
    totalItems: number,
    offset: number,
    setPage: (page: number) => void
  }) => {

  const isFirstPage = currentPage === 1;
  const isLastPage = (currentPage * offset) >= totalItems;
  const listStart = (currentPage * offset) + 1;
  const listFinish = Math.min((currentPage + 1) * offset, totalItems);

  return (
    <div className='items-list-pagination-container'>
      <button
        className='items-list-pagination-button left'
        onClick={() => setPage(currentPage - 1)}
        disabled={isFirstPage}
      >
        Previous
      </button>
      {isFirstPage && <span className='items-list-pagination-ellipsis'>1...</span>}
      <span className='items-list-pagination-current-page'>{`${listStart}...${listFinish}`}</span>
      {isLastPage && <span className='items-list-pagination-ellipsis'>...{totalItems}</span>}
      <button
        className='items-list-pagination-button right'
        onClick={() => setPage(currentPage + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
}