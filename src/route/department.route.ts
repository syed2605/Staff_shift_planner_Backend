import express from 'express';
import * as departmentController from '../controller/department.controller';
import { validate } from '../middleware/validate.middleware';
import { departmentCreateSchema } from '../validators/department.validator';

const router = express.Router();

router.post('/', validate(departmentCreateSchema), departmentController.createDepartment);
router.get('/', departmentController.getAllDepartments);

export default router;
