import Department from '../models/department.model';
import { IDepartment } from '../interface/model.interface';
import { cacheGet, cacheSet } from '../redis/redis';
import { CacheKeys } from '../constants/cacheKeys';


export const createDepartment = async (departmentData: IDepartment): Promise<IDepartment> => {
  const department = await Department.create(departmentData);
  return department;
};

export const getAllDepartments = async (
  filter: any = {},
  sortOptions: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' },
  skip: number = 0,
  limit: number = 10
): Promise<{ departments: IDepartment[]; total: number }> => {
    
const cacheKey = `allDepartments:${JSON.stringify(filter)}:${JSON.stringify(sortOptions)}:${skip}:${limit}`;
    const cachedData = await cacheGet<{ departments: IDepartment[]; total: number }>(cacheKey);
    if (cachedData) {
        console.log('Fetching all departments from cache');
        return cachedData;
    }

  const departments = await Department.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);
  const total = await Department.countDocuments(filter);
  await cacheSet(cacheKey, { departments, total }, CacheKeys.DEPARTMENTS_CACHE_TTL);
  return { departments, total };
};
