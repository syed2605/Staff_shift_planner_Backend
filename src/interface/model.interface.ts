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