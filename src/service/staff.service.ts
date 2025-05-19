import Staff from '../models/staff.model';
import { IStaff } from '../interface/model.interface';
import { sendEmail } from '../utils/email.util'

export const createStaff = async (staffData: IStaff): Promise<IStaff> => {
  const staff = await Staff.create(staffData);
  const emailTo = 'gouse.syed@gmail.com'; // checking email by hardcoding
      const subject = `Welcome ${staff.name}`;
    const html = `
      <h2>Welcome Email!!</h2>
      <p>Welcoming to the bayers Hospital!!
       From now on You will be informed your shify details via Email
       or by your number ${staff.contact}
       </p>
      Date: ${new Date().toLocaleString()}</p>
    `;
  await sendEmail(emailTo, subject, html);
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
