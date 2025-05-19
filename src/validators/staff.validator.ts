import Joi from 'joi';

export const staffCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  staffId: Joi.string().alphanum().min(3).max(20).required(),
  department: Joi.string().min(2).max(50).required(),
  role: Joi.string().min(2).max(50).required(),
  shiftPreference: Joi.string()
    .valid('Morning', 'Afternoon', 'Night')
    .required(),
  contact: Joi.string()
    .pattern(/^[0-9]{8,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Contact must be a valid phone number with 8 to 15 digits',
    }),
});
