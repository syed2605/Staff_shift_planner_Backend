import { Request } from 'express';

interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  filterBy?: string;
  filterValue?: string;
}

interface PaginationResult {
  skip: number;
  pageSize: number;
  pageNumber: number;
}

interface SortOptions {
  [key: string]: 1 | -1;
}

export const getPagination = (queryParams: QueryParams, defaultLimit = '3'): PaginationResult => {
  const pageNumber = parseInt(queryParams.page || '1', 10);
  const pageSize = parseInt(queryParams.limit || defaultLimit, 10);
  const skip = (pageNumber - 1) * pageSize;
  return { skip, pageSize, pageNumber };
};

export const getSortOptions = (queryParams: QueryParams): Record<string, 'asc' | 'desc'> => {
    const sortDirection: 'asc' | 'desc' = queryParams.sortOrder === 'desc' ? 'desc' : 'asc';
    return queryParams.sortBy ? { [queryParams.sortBy]: sortDirection } : { createdAt: 'desc' };
  };

export const getSearchFilter = (queryParams: QueryParams, searchFields: string[]): any => {
    const { search } = queryParams;
    if (search && searchFields && searchFields.length > 0) {
        const orConditions = searchFields.map(field => ({
        [field]: { $regex: search, $options: 'i' },
        }));
        return { $or: orConditions };
    }
    return {};
};

export const getDynamicFilter = (queryParams: QueryParams): any => {
    const { filterBy, filterValue } = queryParams; 
    if (filterBy && filterValue) {
      try {
        const parsedValue = JSON.parse(filterValue as string);
        if (Array.isArray(parsedValue)) {
          return { [filterBy]: { $in: parsedValue } };
        } else {
          return { [filterBy]: filterValue };
        }
      } catch (error) {
        return { [filterBy]: filterValue };
      }
    }
    return {};
  };