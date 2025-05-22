import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Software } from './entities/Software';
import { Request } from './entities/Request';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'accessdb',
  synchronize: true,
  entities: [User, Software, Request],
});