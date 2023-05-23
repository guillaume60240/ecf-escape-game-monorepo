import { PostgresConfig } from '@/config/slonik/slonik.config';

const pgConfig: PostgresConfig = {
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: '5432',
  database: 'escape_game_postgres',
};

export const testConfig = {
  get: (key: string): any => {
    if (key === 'postgres') return pgConfig;
    throw new Error(`Missing test configuration for ${key}`);
  },
};
