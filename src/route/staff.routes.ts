import express from 'express';
import * as staffController from '../controller/staff.controller';
import { validate } from '../middleware/validate.middleware';
import { staffCreateSchema } from '../validators/staff.validator';

const router = express.Router();

router.post('/', validate(staffCreateSchema), staffController.createStaff);
router.get('/', staffController.getAllStaff);

export default router;