import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import validateConfig from '../utils/validate-config';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_TYPE: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  DATABASE_PORT: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  @IsOptional()
  DATABASE_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME: string;

  @IsBoolean()
  @IsOptional()
  DATABASE_SYNCHRONIZE: boolean;

  @IsInt()
  @IsOptional()
  DATABASE_MAX_CONNECTIONS: number;

  @IsBoolean()
  @IsOptional()
  DATABASE_SSL_ENABLED: boolean;

  @IsBoolean()
  @IsOptional()
  DATABASE_REJECT_UNAUTHORIZED: boolean;

  @IsString()
  @IsOptional()
  DATABASE_CA: string;

  @IsString()
  @IsOptional()
  DATABASE_KEY: string;

  @IsString()
  @IsOptional()
  DATABASE_CERT: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  const isTestEnvironment: boolean = process.env.NODE_ENV === 'test';
  const testPrefix = isTestEnvironment ? 'TEST_' : '';

  return {
    url: process.env[testPrefix + 'DATABASE_URL'] || process.env.DATABASE_URL,
    type:
      process.env[testPrefix + 'DATABASE_TYPE'] || process.env.DATABASE_TYPE,
    host:
      process.env[testPrefix + 'DATABASE_HOST'] || process.env.DATABASE_HOST,
    port: process.env[testPrefix + 'DATABASE_PORT']
      ? parseInt(process.env[testPrefix + 'DATABASE_PORT'], 10)
      : process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 3306,
    password:
      process.env[testPrefix + 'DATABASE_PASSWORD'] ||
      process.env.DATABASE_PASSWORD,
    name:
      process.env[testPrefix + 'DATABASE_NAME'] || process.env.DATABASE_NAME,
    username:
      process.env[testPrefix + 'DATABASE_USERNAME'] ||
      process.env.DATABASE_USERNAME,
    synchronize:
      process.env[testPrefix + 'DATABASE_SYNCHRONIZE'] === 'true'
        ? process.env[testPrefix + 'DATABASE_SYNCHRONIZE'] === 'true'
        : process.env.DATABASE_SYNCHRONIZE === 'true',
    maxConnections: process.env[testPrefix + 'DATABASE_MAX_CONNECTIONS']
      ? parseInt(process.env[testPrefix + 'DATABASE_MAX_CONNECTIONS'], 10)
      : process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    rejectUnauthorized:
      process.env[testPrefix + 'DATABASE_REJECT_UNAUTHORIZED'] === 'true'
        ? process.env[testPrefix + 'DATABASE_REJECT_UNAUTHORIZED'] === 'true'
        : process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
  };
});
