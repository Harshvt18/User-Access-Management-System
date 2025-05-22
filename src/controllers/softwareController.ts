import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { Software } from '../entities/Software';

export const createSoftware = async (req: Request, res: Response) => {
  const { name, description, accessLevels } = req.body;
  const software = AppDataSource.getRepository(Software).create({ name, description, accessLevels });
  await AppDataSource.getRepository(Software).save(software);
  res.status(201).json(software);
};