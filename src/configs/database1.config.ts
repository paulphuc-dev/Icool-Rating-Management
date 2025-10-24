import * as dotenv from "dotenv";
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();
export const typeormConfig1: DataSourceOptions = {
  type: 'mssql',
  host: process.env.DB1_HOST,
  port: parseInt(process.env.DB1_PORT || '1433', 10),
  username: process.env.DB1_USER,
  password: process.env.DB1_PASSWORD,
  database: process.env.DB1_NAME,
  entities: [join(__dirname, '..', 'modules', '**', 'entities', '*.entity.{ts,js}')],
  synchronize: false,
  logging: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
export const dataSource1 = new DataSource(typeormConfig1);