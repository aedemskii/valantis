import { useState, useEffect } from "react";
import { ITEMS_PER_PAGE } from "../assets/consts";
import {
  TItem,
  TItemsFilterParams,
  TProductListResult
} from "../assets/types";
import {
  requestDefaultItemsIds,
  requestFilteredItemsIds,
  fetchItemsByIds,
  fetchFields
} from "../assets/valantis_api";
import { parseParamsForFetch, hasNullValues } from "../assets/services";

export const useProductList = (filterParams: TItemsFilterParams): TProductListResult => {
  const [ unfilteredItemsIds, setUnfilteredItemsIds ] = useState<string[]>([]);
  const [ filteredItemsIds, setFilteredItemsIds ] = useState<string[]>([]);
  const [ lastFilterParamsStr, setLastFilterParamsStr ] = useState<string>(JSON.stringify(parseParamsForFetch(filterParams)));
  const [ items, setItems ] = useState<TItem[]>([]);
  const [ brands, setBrands ] = useState<string[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    if (brands.length === 0) {
      (async () => {
        try {
          const response = await fetchFields(abortController.signal);
          setBrands([...new Set(response.result)].filter(brand => brand));
        } catch (error: unknown) {
          if (error instanceof Error)
            setError(error.message);
        }
      })();
    }
    const requestItemsByIds = async (itemsIds: string[]) => {
      try {
        const response = await fetchItemsByIds([...itemsIds]);
        const uniqueProducts: Map<string, TItem> = new Map();
        response.result.forEach(item => {
          if (!uniqueProducts.has(item.id))
            uniqueProducts.set(item.id, item);
        });
        setItems([...uniqueProducts.values()]);
      } catch (error: unknown) {
        if (error instanceof Error)
          setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const filterParamsForFetch = parseParamsForFetch(filterParams);
    const page = filterParams.page;
    if (filterParamsForFetch === null) {
      // No filter case
      const ids = unfilteredItemsIds.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
      if (!hasNullValues(ids) && ids.length === ITEMS_PER_PAGE) {
        // We already have the ids
        requestItemsByIds(ids);
      } else {
        // We need to fetch new ids
        (async () => {
          try {
            const tempItemIds: Set<string> = new Set();
            let offset = (page - 1) * ITEMS_PER_PAGE;
            while (tempItemIds.size < ITEMS_PER_PAGE) {
              const response = await requestDefaultItemsIds(
                offset,
                ITEMS_PER_PAGE - tempItemIds.size,
                abortController.signal
              );
              const ids = response.result;
              ids.forEach((id: string) => {
                tempItemIds.add(id);
              });
              offset += ids.length;
            }
            setUnfilteredItemsIds(prev => {
              const arr = [...tempItemIds];
              for (let i = (page - 1) * ITEMS_PER_PAGE; i < page * ITEMS_PER_PAGE; i++) {
                prev[i] = arr[i - (page - 1) * ITEMS_PER_PAGE];
              }
              return [...new Set(prev)];
            });
            requestItemsByIds([...tempItemIds]);
          } catch (error: unknown) {
            if (error instanceof Error)
              setError(error.message);
          }
        })();
      }
    } else {
      const filterParamsStr = JSON.stringify(parseParamsForFetch(filterParams));
      if (filterParamsStr === lastFilterParamsStr && filteredItemsIds.length > 0) {
        requestItemsByIds(filteredItemsIds.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
      } else {
        setLastFilterParamsStr(filterParamsStr);
        (async () => {
          try {
            const response = await requestFilteredItemsIds(
              filterParamsForFetch,
              abortController.signal
            );
            const itemsIds = [...new Set(response.result)];
            setFilteredItemsIds(itemsIds);
            requestItemsByIds(itemsIds.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
          } catch (error: unknown) {
            if (error instanceof Error)
              setError(error.message);
          }
        })();
      }
    }

    return () => {
      abortController.abort();
    };
  }, [filterParams]);

  return {
    items,
    totalItems: parseParamsForFetch(filterParams) === null ? filterParams.page * ITEMS_PER_PAGE : filteredItemsIds.length,
    brands,
    loading,
    error,
  };
};