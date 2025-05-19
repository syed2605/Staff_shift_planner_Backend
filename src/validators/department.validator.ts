import Joi from 'joi';

export const departmentCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(255).optional(),
  isActive: Joi.boolean().optional()
});
