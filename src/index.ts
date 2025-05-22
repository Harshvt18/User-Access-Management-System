import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './ormconfig';
import authRoutes from './routes/authRoutes';
import softwareRoutes from './routes/softwareRoutes';
import requestRoutes from './routes/requestRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

AppDataSource.initialize().then(() => {
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch((err) => console.error('DB connection failed:', err));

export default app;