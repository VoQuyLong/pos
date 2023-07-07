import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const isTestEnvironment = process.env.NODE_ENV == 'test';

const databaseUrl = isTestEnvironment
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;
const databaseHost = isTestEnvironment
  ? process.env.TEST_DATABASE_HOST
  : process.env.DATABASE_HOST;
const databasePort = isTestEnvironment
  ? parseInt(process.env.TEST_DATABASE_PORT || '3306', 10)
  : parseInt(process.env.DATABASE_PORT || '3306', 10);
const databaseUsername = isTestEnvironment
  ? process.env.TEST_DATABASE_USERNAME
  : process.env.DATABASE_USERNAME;
const databasePassword = isTestEnvironment
  ? process.env.TEST_DATABASE_PASSWORD
  : process.env.DATABASE_PASSWORD;
const databaseName = isTestEnvironment
  ? process.env.TEST_DATABASE_NAME
  : process.env.DATABASE_NAME;

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: databaseUrl,
  host: databaseHost,
  port: databasePort,
  username: databaseUsername,
  password: databasePassword,
  database: databaseName,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.LOG_MODE == 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
