import { registerAs } from '@nestjs/config';
export type PostgresConfig = {
  user: string;
  password: string;
  host: string;
  port: string;
  database: string;
};
export default registerAs(
  'postgres',
  (): PostgresConfig => ({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
  }),
);
