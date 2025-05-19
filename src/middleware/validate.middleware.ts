import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import { STATUS_CODES } from '../constants/statusCodes';
 
export const validate = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req, res, next): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: 'Validation failed',
        details: error.details.map((d) => d.message),
      });
      return;
    }
    next();
  };
};