/* import { registerAs } from '@nestjs/config';

export type SlonikConfig = {
  connectionUri: string;
  options: {
    connectionRetryLimit: number;
    connectionTimeout: number;
    idleInTransactionSessionTimeout: number;
    idleTimeout: number;
    maximumPoolSize: number;
    statementTimeout: number;
    transactionRetryLimit: number;
  };
};

export type PostgresConfig = SlonikConfig & {
  user: string;
  password: string;
  host: string;
  port: string;
  database: string;
  searchPath: string[];
};

export default registerAs('postgres', () => ({
  client: 'pg',
  connection: {
    user: process.env.POSTGRES_CLOUDSYNC_REPORTING_USER || 'postgres',
    password: process.env.POSTGRES_CLOUDSYNC_REPORTING_PASSWORD || '',
    host: process.env.POSTGRES_CLOUDSYNC_REPORTING_HOST || 'localhost',
    port: process.env.POSTGRES_CLOUDSYNC_REPORTING_PORT || '5432',
    database: process.env.POSTGRES_CLOUDSYNC_REPORTING_DB || 'postgres',
    searchPath: ['cloudSync'],
  },
  // Do not allow more than this many connections. Use 'DISABLE_TIMEOUT' constant to disable the timeout. (Default: 10)
  maximumPoolSize: +(process.env.POSTGRES_MAX_CONNECTIONS as string) || 10,

  // Timeout (in milliseconds) after which idle clients are closed. Use 'DISABLE_TIMEOUT' constant to disable the timeout. (Default: 5000)
  idleTimeout: +(process.env.POSTGRES_IDLE_TIMEOUT as string) || 100,

  // Timeout (in milliseconds) after which an error is raised if connection cannot cannot be established. (Default: 5000)
  connectionTimeout:
    +(process.env.POSTGRES_CONNECTION_TIMEOUT as string) || 5000,

  // Timeout (in milliseconds) after which database is instructed to abort the query. Use 'DISABLE_TIMEOUT' constant to disable the timeout. (Default: 60000)
  statementTimeout:
    +(process.env.POSTGRES_STATEMENT_TIMEOUT as string) || 25000,

  // Timeout (in milliseconds) after which idle clients are closed. Use 'DISABLE_TIMEOUT' constant to disable the timeout. (Default: 60000)
  idleInTransactionSessionTimeout:
    +(process.env.POSTGRES_IDLE_IN_TRANSACTION_SESSION_TIMEOUT as string) ||
    20000,

  // Number of times to retry establishing a new connection. (Default: 3)
  connectionRetryLimit:
    +(process.env.POSTGRES_CONNECTION_RETRY_LIMIT as string) || 1,

  // Number of times a transaction failing with Transaction Rollback class error is retried. (Default: 5)
  transactionRetryLimit:
    +(process.env.POSTGRES_TRANSACTION_RETRY_LIMIT as string) || 2,
}));
 */
