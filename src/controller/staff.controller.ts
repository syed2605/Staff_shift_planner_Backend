import { MESSAGES } from './../constants/errorMessages';
import { Request, Response } from 'express';
import * as staffService from '../service/staff.service';
import { IStaff } from '../interface/model.interface';
import { errorResponse, successResponse } from '../utils/response.utils';
import { STATUS_CODES } from './../constants/statusCodes';
import { getDynamicFilter, getPagination, getSearchFilter, getSortOptions } from '../utils/query.utils';

export const createStaff = async (req: Request, res: Response) => {
  try {
    const staffData: IStaff = req.body;
    staffData.roleId = req.body.role;
    staffData.departmentId = req.body.department;
    const staff = await staffService.createStaff(staffData);
    return successResponse(res, staff, MESSAGES.STAFF_CREATED_SUCESSFULLY, STATUS_CODES.OK);
  } catch (err: any) {
    return errorResponse(res, err, MESSAGES.STAFF_CREATION_FAILED, STATUS_CODES.BAD_REQUEST);
  }
};

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const { skip, pageSize, pageNumber } = getPagination(req.query);
    const sortOptions = getSortOptions(req.query);
    const searchFilter = getSearchFilter(req.query, ['name', 'staffId', 'department', 'role']);
    const dynamicFilter = getDynamicFilter(req.query);
    const filter = { ...searchFilter, ...dynamicFilter };
    const { staff, total } = await staffService.getAllStaff(filter, sortOptions, skip, pageSize);
    const totalPages = Math.ceil(total / pageSize);
    return successResponse(res, {
     staff,
     total,
     totalPages,
     currentPage: pageNumber,
     pageSize,
    }, MESSAGES.STAFF_FETCHED_SUCCESSFULLY, STATUS_CODES.OK);
  } catch (err: any) {
    return errorResponse(res, err, MESSAGES.STAFF_FETCH_FAILED, STATUS_CODES.INTERNAL_ERROR);
  }
};