import { Md5 } from 'ts-md5';
import { TItem, TFetchItemsIdsParams } from './types';
import { API_URL } from './consts';

export const fetchItemsIds = async ({offset, limit, params, signal}: TFetchItemsIdsParams): Promise<{result: string[]}> => {
  const requestBody = {
    action: params ? 'filter' : 'get_ids',
    params: {
      ...(params ?? {}),
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

export const fetchItemsByIds = async (ids: string[]): Promise<{result: TItem[]}> => {
  const requestBody = {
    action: 'get_items',
    params: {
      ids: ids
    }
  };

  const response = await fetch('http://api.valantis.store:40000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': generatePassword()
    },
    body: JSON.stringify(requestBody)
  });

  return await response.json();
};

const generatePassword = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const md5 = new Md5();
  const end = md5.appendStr('Valantis_' + year + month + day).end();
  try {
    if (end) {
      const password = end.toString();
      return password;
    } else {
      throw new Error('Error in md5');
    }
  } catch (e) {
    console.error(e);
    return '';
  }
};