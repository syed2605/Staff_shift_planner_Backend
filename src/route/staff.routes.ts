import express from 'express';
import * as staffController from '../controller/staff.controller';
import { validateBody } from '../middleware/validate';
import { staffCreateSchema } from '../validators/staff.validator';

const router = express.Router();

router.post('/', validateBody(staffCreateSchema), staffController.createStaff);
router.get('/', staffController.getAllStaff);

export default router;