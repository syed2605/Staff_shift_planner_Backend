import { Request, Response } from 'express';
import * as departmentService from '../service/department.service';
import { IDepartment } from '../interface/model.interface';
import { errorResponse, successResponse } from '../utils/response.utils';
import { MESSAGES } from '../constants/errorMessages';
import { STATUS_CODES } from '../constants/statusCodes';
import { getPagination, getSortOptions, getSearchFilter, getDynamicFilter } from '../utils/query.utils';

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const departmentData: IDepartment = req.body;
    const department = await departmentService.createDepartment(departmentData);
    return successResponse(res, department, MESSAGES.DEPARTMENT_CREATED_SUCCESSFULLY, STATUS_CODES.OK);
  } catch (err: any) {
    return errorResponse(res, err, MESSAGES.DEPARTMENT_CREATION_FAILED, STATUS_CODES.BAD_REQUEST);
  }
};

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const { skip, pageSize, pageNumber } = getPagination(req.query);
    const sortOptions = getSortOptions(req.query);
    const searchFilter = getSearchFilter(req.query, ['name']);
    const dynamicFilter = getDynamicFilter(req.query);
    const filter = { ...searchFilter, ...dynamicFilter };
    const { departments, total } = await departmentService.getAllDepartments(filter, sortOptions, skip, pageSize);
    const totalPages = Math.ceil(total / pageSize);
    return successResponse(res, {
      departments,
      total,
      totalPages,
      currentPage: pageNumber,
      pageSize,
    }, MESSAGES.DEPARTMENT_FETCHED_SUCCESSFULLY, STATUS_CODES.OK);
  } catch (err: any) {
    return errorResponse(res, err, MESSAGES.DEPARTMENT_FETCH_FAILED, STATUS_CODES.INTERNAL_ERROR);
  }
};
