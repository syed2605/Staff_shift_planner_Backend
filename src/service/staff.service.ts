import Staff, { IStaff } from '../models/staff.model';

export const createStaff = async (staffData: IStaff): Promise<IStaff> => {
  const staff = await Staff.create(staffData);
  return staff;
};

export const getAllStaff = async (): Promise<IStaff[]> => {
  const staff = await Staff.find().sort({ createdAt: -1 });
  return staff;
};