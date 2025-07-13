import * as path from 'path';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// Sempre busca o .env na raiz do projeto
const envPath = path.resolve(process.cwd(), '.env');
console.log('Carregando .env de:', envPath);

config({ path: envPath });

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const basePath = path.join(process.cwd(), 'apps/backend/src');

const isTsNode = process.env.TS_NODE === 'true' || process.argv.some(arg => arg.includes('ts-node'));
const entitiesPath = isTsNode
  ? path.join(basePath, '/game/**/*.entity.ts')
  : path.join(basePath, '/game/**/*.entity.js');
const migrationsPath = isTsNode
  ? path.join(basePath, '/../migrations/*.ts')
  : path.join(basePath, '/../migrations/*.js');

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