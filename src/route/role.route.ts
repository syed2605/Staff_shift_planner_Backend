import express from 'express';
import * as roleController from '../controller/role.controller';
import { validate } from '../middleware/validate.middleware';
import { roleCreateSchema } from '../validators/role.validator';

const router = express.Router();

router.post('/', validate(roleCreateSchema), roleController.createRole);
router.get('/', roleController.getAllRoles);

export default router;
