import Role from '../models/role.model';
import { IRole } from '../interface/model.interface';

export const createRole = async (roleData: IRole): Promise<IRole> => {
  const role = await Role.create(roleData);
  return role;
};

export const getAllRoles = async (
  filter: any = {},
  sortOptions: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' },
  skip: number = 0,
  limit: number = 10
): Promise<{ roles: IRole[]; total: number }> => {
  const roles = await Role.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);
  const total = await Role.countDocuments(filter);
  return { roles, total };
};
