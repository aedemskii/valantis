import { TItemsFilterParams, TItemsFilterParamsForFetch } from './types';
import { Md5 } from 'ts-md5';

export const parseParamsForFetch = (params: TItemsFilterParams): TItemsFilterParamsForFetch | null => {
  const result: TItemsFilterParamsForFetch = {};
  if (params.product)
    result.product = params.product
  if (params.brand)
    result.brand = params.brand
  if (params.price)
    result.price = params.price

  if (Object.keys(result).length)
    return result;
  else
    return null;
};

export const generatePassword = (): string => {
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

export const hasNullValues = (array: Array<any>): boolean => {
  return array.some((item) => {
      return item === null;
  });
}