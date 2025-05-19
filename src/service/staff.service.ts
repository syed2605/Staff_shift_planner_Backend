import Staff from '../models/staff.model';
import { IStaff } from '../interface/model.interface';


export const createStaff = async (staffData: IStaff): Promise<IStaff> => {
  const staff = await Staff.create(staffData);
  return staff;
};

export const getAllStaff = async (
 filter: any = {},
 sortOptions: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' },
 skip: number = 0,
 limit: number = 10
): Promise<{ staff: IStaff[]; total: number }> => {
  
const staff = await Staff.find(filter)
  .populate({
  path: 'departmentId',
  select: 'name',
  })
  .populate({
  path: 'roleId',
  select: 'title',
  })
  .sort(sortOptions)
  .skip(skip)
  .limit(limit)
  .lean(); 
  const total = await Staff.countDocuments(filter);
  return { staff, total };
};
