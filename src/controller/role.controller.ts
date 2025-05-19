import { Request, Response } from 'express';
import * as roleService from '../service/role.service';
import { IRole } from '../interface/model.interface';
import { errorResponse, successResponse } from '../utils/response.utils';
import { MESSAGES } from '../constants/errorMessages';
import { STATUS_CODES } from '../constants/statusCodes';
import { getPagination, getSortOptions, getSearchFilter, getDynamicFilter } from '../utils/query.utils';

export const createRole = async (req: Request, res: Response) => {
  try {
    const roleData: IRole = req.body;
    const role = await roleService.createRole(roleData);
    return successResponse(res, role, MESSAGES.ROLE_CREATED_SUCCESSFULLY, STATUS_CODES.OK);
  } catch (err: any) {
    return errorResponse(res, err, MESSAGES.ROLE_CREATION_FAILED, STATUS_CODES.BAD_REQUEST);
  }
};

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const { skip, pageSize, pageNumber } = getPagination(req.query);
    const sortOptions = getSortOptions(req.query);
    const searchFilter = getSearchFilter(req.query, ['title']);
    const dynamicFilter = getDynamicFilter(req.query);
    const filter = { ...searchFilter, ...dynamicFilter };
    const { roles, total } = await roleService.getAllRoles(filter, sortOptions, skip, pageSize);
    const totalPages = Math.ceil(total / pageSize);
    return successResponse(res, {
      roles,
      total,
      totalPages,
      currentPage: pageNumber,
      pageSize,
    }, MESSAGES.ROLE_FETCHED_SUCCESSFULLY, STATUS_CODES.OK);
  } catch (err: any) {
    return errorResponse(res, err, MESSAGES.ROLE_FETCH_FAILED, STATUS_CODES.INTERNAL_ERROR);
  }
};
