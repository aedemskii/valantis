import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = (): [
  number,
  (page: number) => void
] => {
  const [ searchParams, setSearchParams ] = useSearchParams({});

  const [ page, setNewPage ] = useState<number>(searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1);

  const setPage = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', page.toString());
      setNewPage(page)
      return prev;
    }, { replace: true });
  };

  return [
    page,
    setPage
  ];
};
