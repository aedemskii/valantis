import { useState, useEffect } from "react";
import { TItem, TItemsFilterParams, TProductListResult } from "../assets/types";
import { ITEMS_PER_PAGE } from "../assets/consts";
import { fetchItemsIds, fetchItemsByIds } from "../assets/valantis_api";

export const useProductList = (filterParams: TItemsFilterParams, page: number): TProductListResult => {
  const [ items, setItems ] = useState<TItem[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const tempItemIds: Set<string> = new Set();
        //const params = Object.keys(filterParams).length ? filterParams : undefined;
        while (tempItemIds.size < ITEMS_PER_PAGE) {
          const response = await fetchItemsIds({
            offset: (page - 1) * ITEMS_PER_PAGE + tempItemIds.size,
            limit: ITEMS_PER_PAGE - tempItemIds.size,
            //params: params,
            signal: abortController.signal
          });
          const ids = response.result;
          ids.forEach(id => {
            tempItemIds.add(id);
          });
        }
        const response = await fetchItemsByIds([...tempItemIds]);
        setItems(response.result);
      } catch (error: unknown) {
        if (error instanceof Error)
          setError(error.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [filterParams, page]);

  return {
    items,
    loading,
    error,
  };
};