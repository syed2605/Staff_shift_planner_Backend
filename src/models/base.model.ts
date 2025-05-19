import mongoose from 'mongoose';
 
export const commonSchemaFields = {
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
};
 
export const schemaOptions = {
  timestamps: true,
};