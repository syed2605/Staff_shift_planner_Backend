import mongoose, { Schema, Document } from 'mongoose';
import { commonSchemaFields, schemaOptions } from './base.model';
import type { IDepartment } from '../interface/model.interface';

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, required: true, default: false },
    ...commonSchemaFields,
  },
  schemaOptions
);

export default mongoose.model<IDepartment>('Department', departmentSchema);
