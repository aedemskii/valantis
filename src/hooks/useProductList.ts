import { useState, useEffect } from "react";
import { ITEMS_PER_PAGE, TRIES_PER_FETCH } from "../assets/consts";
import {
  TItem,
  TItemsFilterParams,
  TProductListResult,
  TItemsFilterParamsForFetch
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

    const fetchBrands = async (retry?: number) => {
      try {
        const response = await fetchFields(abortController.signal);
        setBrands([...new Set(response.result)].filter(brand => brand));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          if (retry && retry > 0) {
            fetchBrands(retry - 1);
          } else {
            setError(error.message);
          }
        }
      }
    };

    const requestItemsByIds = async (itemsIds: string[], retry?: number) => {
      try {
        const response = await fetchItemsByIds([...itemsIds]);
        const uniqueProducts: Map<string, TItem> = new Map();
        response.result.forEach(item => {
          if (!uniqueProducts.has(item.id))
            uniqueProducts.set(item.id, item);
        });
        setItems([...uniqueProducts.values()]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          if (retry && retry > 0) {
            requestItemsByIds(itemsIds, retry - 1);
          } else {
            setError(error.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    const getFilteredItems = async (filterParamsForFetch: TItemsFilterParamsForFetch, retry?: number) => {
      try {
        const response = await requestFilteredItemsIds(
          filterParamsForFetch,
          abortController.signal
        );
        const itemsIds = [...new Set(response.result)];
        setFilteredItemsIds(itemsIds);
        requestItemsByIds(itemsIds.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE), TRIES_PER_FETCH);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          if (retry && retry > 0) {
            getFilteredItems(filterParamsForFetch, retry - 1);
          } else {
            setError(error.message);
          }
        }
      }
    }

    const getUnfilteredItemsIds = async (retry?: number) => {
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
        requestItemsByIds([...tempItemIds], TRIES_PER_FETCH);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          if (retry && retry > 0) {
            getUnfilteredItemsIds(retry - 1);
          } else {
            setError(error.message);
          }
        }
      }
      };

    if (brands.length === 0) {
      fetchBrands(TRIES_PER_FETCH);
    }

    const filterParamsForFetch = parseParamsForFetch(filterParams);
    const page = filterParams.page;
    if (filterParamsForFetch === null) {
      const ids = unfilteredItemsIds.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
      if (!hasNullValues(ids) && ids.length === ITEMS_PER_PAGE) {
        requestItemsByIds(ids, TRIES_PER_FETCH);
      } else {
        getUnfilteredItemsIds(TRIES_PER_FETCH);
      }
    } else {
      const filterParamsStr = JSON.stringify(parseParamsForFetch(filterParams));
      if (filterParamsStr === lastFilterParamsStr && filteredItemsIds.length > 0) {
        requestItemsByIds(filteredItemsIds.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE), TRIES_PER_FETCH);
      } else {
        setLastFilterParamsStr(filterParamsStr);
        getFilteredItems(filterParamsForFetch, TRIES_PER_FETCH);
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