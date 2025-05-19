import Staff from '../models/staff.model';
import { IStaff } from '../interface/model.interface';


export const createStaff = async (staffData: IStaff): Promise<IStaff> => {
  const staff = await Staff.create(staffData);
  return staff;
};

export const getAllStaff = async (): Promise<IStaff[]> => {
  const staff = await Staff.find().sort({ createdAt: -1 });
  return staff;
};