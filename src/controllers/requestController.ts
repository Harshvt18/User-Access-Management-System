import { Request as Req, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { Request as AccessRequest } from '../entities/Request';
import { User } from '../entities/User';
import { Software } from '../entities/Software';

export const submitRequest = async (req: Req, res: Response) => {
  const { softwareId, accessType, reason } = req.body;

  const user = await AppDataSource.getRepository(User).findOneBy({ id: req.user.id });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const software = await AppDataSource.getRepository(Software).findOneBy({ id: softwareId });
  if (!software) return res.status(404).json({ message: 'Software not found' });

  const request = AppDataSource.getRepository(AccessRequest).create({
    user,
    software,
    accessType,
    reason,
    status: 'Pending',
  });

  await AppDataSource.getRepository(AccessRequest).save(request);
  res.status(201).json(request);
};

export const updateRequest = async (req: Req, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const requestRepo = AppDataSource.getRepository(AccessRequest);
  const request = await requestRepo.findOneBy({ id: parseInt(id) });
  if (!request) return res.status(404).json({ message: 'Request not found' });

  request.status = status;
  await requestRepo.save(request);
  res.json(request);
};
