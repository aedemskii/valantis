import { TItem, TItemsFilterParamsForFetch } from './types';
import { API_URL } from './consts';
import { generatePassword } from './services';

export const requestDefaultItemsIds = async (offset: number, limit: number, signal: AbortSignal): Promise<{result: string[]}> => {
  const requestBody = {
    action: 'get_ids',
    params: {
      offset: offset,
      limit: limit
    }
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': generatePassword()
    },
    body: JSON.stringify(requestBody),
    signal: signal
  });

  return await response.json();
};

export const requestFilteredItemsIds = async (params: TItemsFilterParamsForFetch, signal: AbortSignal): Promise<{result: string[]}> => {
  const requestBody = {
    action: 'filter',
    params: params
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': generatePassword()
    },
    body: JSON.stringify(requestBody),
    signal: signal
  });

  return await response.json();
};

export const fetchFields = async (signal: AbortSignal): Promise<{result: string[]}> => {
  const requestBody = {
    action: 'get_fields',
    params: {
      field: 'brand',
    }
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': generatePassword()
    },
    body: JSON.stringify(requestBody),
    signal: signal
  });

  return await response.json();
};

export const fetchItemsByIds = async (ids: string[]): Promise<{result: TItem[]}> => {
  const requestBody = {
    action: 'get_items',
    params: {
      ids: ids
    }
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': generatePassword()
    },
    body: JSON.stringify(requestBody)
  });

  return await response.json();
};