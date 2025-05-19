// controllers/staff.controller.ts
import { Request, Response } from 'express';
import * as staffService from '../service/staff.service';
import { IStaff } from '../models/staff.model';

export const createStaff = async (req: Request, res: Response) => {
  try {
    const staffData: IStaff = req.body;
    const staff = await staffService.createStaff(staffData);
    res.status(201).json(staff);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staff = await staffService.getAllStaff();
    res.json(staff);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};