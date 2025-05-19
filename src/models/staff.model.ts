import mongoose, { Document, Schema, Types } from 'mongoose';
import { commonSchemaFields, schemaOptions } from './base.model';

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

const staffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: true },
    staffId: { type: String, unique: true, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    shiftPreference: {
      type: String,
      enum: ['Morning', 'Afternoon', 'Night'],
      required: true,
    },
    contact: { type: String, required: true },
    ...commonSchemaFields,
  },
  schemaOptions
);

export default mongoose.model<IStaff>('Staff', staffSchema);