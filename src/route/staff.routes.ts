import express from 'express';
const router = express.Router();
import * as staffController from '../controller/staff.controller';

router.post('/', staffController.createStaff);
router.get('/', staffController.getAllStaff);

export default router;