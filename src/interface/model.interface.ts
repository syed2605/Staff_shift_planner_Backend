import  { Document, Types } from 'mongoose';

export interface IStaff extends Document {
  _id: Types.ObjectId;
  name: string;
  staffId: string;
  department: string;
  role: string;
  shiftPreference: 'Morning' | 'Afternoon' | 'Night';
  contact: string;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}
export interface IDepartment extends Document {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface IRole extends Document {
  title: string;
  permissions?: string[];
}