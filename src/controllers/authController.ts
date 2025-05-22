import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ username, password: hashed, role: 'Employee' });
  await userRepo.save(user);
  res.status(201).json({ message: 'User registered' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await AppDataSource.getRepository(User).findOneBy({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: '1d',
  });
  res.json({ token, role: user.role });
};