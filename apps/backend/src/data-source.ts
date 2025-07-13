import * as path from 'path';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// Sempre busca o .env na raiz do projeto
const envPath = path.resolve(process.cwd(), '.env');

config({ path: envPath });

const basePath = path.join(process.cwd(), 'apps/backend/src');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(basePath, '/game/**/*.entity.ts')],
  migrations: [path.join(basePath, '/../migrations/*.ts')],
  migrationsTableName: 'migrations',
  synchronize: false
});