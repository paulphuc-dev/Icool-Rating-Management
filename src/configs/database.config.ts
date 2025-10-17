import * as dotenv from "dotenv";
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();
export const typeormConfig: DataSourceOptions = {
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '..', 'modules', '**', 'entities', '*.entity.{ts,js}')],
  synchronize: false,
  logging: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
export const dataSource = new DataSource(typeormConfig);