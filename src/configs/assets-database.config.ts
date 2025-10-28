import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();
export const typeormAssetsConfig: DataSourceOptions = {
  type: 'mssql',
  host: process.env.ASSETS_DB_HOST,
  port: parseInt(process.env.ASSETS_DB_PORT || '1436', 10),
  username: process.env.ASSETS_DB_USER,
  password: process.env.ASSETS_DB_PASSWORD,
  database: process.env.ASSETS_DB_NAME,
  entities: [
    join(__dirname, '..', 'modules', '**', 'entities', '*.entity.{ts,js}'),
  ],
  synchronize: false,
  logging: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
export const dataSourceAssets = new DataSource(typeormAssetsConfig);
