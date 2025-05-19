import { MESSAGES } from './../constants/errorMessages';
import { Request, Response } from 'express';
import * as staffService from '../service/staff.service';
import { IStaff } from '../interface/model.interface';
import { errorResponse, successResponse } from '../utils/response.utils';
import { STATUS_CODES } from './../constants/statusCodes';

export const createStaff = async (req: Request, res: Response) => {
  try {
    const staffData: IStaff = req.body;
    const staff = await staffService.createStaff(staffData);
    return successResponse(res, staff, MESSAGES.STAFF_CREATED_SUCESSFULLY, STATUS_CODES.OK);
  } catch (err: any) {
    return errorResponse(res, err, MESSAGES.STAFF_CREATION_FAILED, STATUS_CODES.BAD_REQUEST);
  }
};

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staff = await staffService.getAllStaff();
    return successResponse(res, staff, MESSAGES.STAFF_FETCHED_SUCCESSFULLY, STATUS_CODES.OK);
  } catch (err: any) {
    return errorResponse(res, err, MESSAGES.STAFF_FETCH_FAILED, STATUS_CODES.INTERNAL_ERROR);
  }
};