import mongoose, { Document, Schema, Types } from 'mongoose';
import { commonSchemaFields, schemaOptions } from './base.model';
import { IStaff } from '../interface/model.interface';

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