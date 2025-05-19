import Department from '../models/department.model';
import { IDepartment } from '../interface/model.interface';

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
  const departments = await Department.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);
  const total = await Department.countDocuments(filter);
  return { departments, total };
};
