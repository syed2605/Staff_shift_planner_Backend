import Joi from 'joi';

export const roleCreateSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(100).optional(),
});
