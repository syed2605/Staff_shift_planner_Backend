import mongoose, { Schema, Document } from 'mongoose';
import { commonSchemaFields, schemaOptions } from './base.model';
import type { IRole } from '../interface/model.interface';

const roleSchema = new Schema<IRole>(
  {
    title: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
    ...commonSchemaFields,
  },
  schemaOptions
);

export default mongoose.model<IRole>('Role', roleSchema);
