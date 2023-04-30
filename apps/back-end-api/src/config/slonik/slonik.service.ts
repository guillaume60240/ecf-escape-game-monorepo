import { BeforeApplicationShutdown, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientConfigurationInput,
  createPool,
  DatabasePool,
  QueryResult,
  TaggedTemplateLiteralInvocation,
} from 'slonik';
import { PrimitiveValueExpression } from 'slonik/src/types';
import { SlonikLoggingInterceptor } from './slonik-logging-interceptor';

@Injectable()
export class SlonikService implements BeforeApplicationShutdown {
  public readonly pool: DatabasePool;
  private readonly logger: Logger = new Logger('SlonikService');

  constructor(private readonly config: ConfigService) {
    const c = {
      // TODO add your database credentials here
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
    };
    const connectionUri = `postgres://${c.user}:${c.password}@${c.host}:${c.port}/${c.database}`;
    const interceptors = [
      new SlonikLoggingInterceptor({ logValues: false, logSQL: true }),
    ];
    const slonikConfig: Partial<ClientConfigurationInput> = {
      connectionRetryLimit:
        +(process.env.POSTGRES_TRANSACTION_RETRY_LIMIT as string) || 2,
      connectionTimeout:
        +(process.env.POSTGRES_STATEMENT_TIMEOUT as string) || 25000,
      idleInTransactionSessionTimeout:
        +(process.env.POSTGRES_IDLE_IN_TRANSACTION_SESSION_TIMEOUT as string) ||
        20000,
      idleTimeout: +(process.env.POSTGRES_IDLE_TIMEOUT as string) || 100,
      maximumPoolSize: +(process.env.POSTGRES_MAX_CONNECTIONS as string) || 10,
      statementTimeout:
        +(process.env.POSTGRES_STATEMENT_TIMEOUT as string) || 25000,
      transactionRetryLimit:
        +(process.env.POSTGRES_TRANSACTION_RETRY_LIMIT as string) || 2,
      captureStackTrace: true,
      interceptors,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    this.pool = createPool(connectionUri, slonikConfig);
    this.logger.log(`Slonik connected to ${c.host} as ${c.user}`, {
      slonikConfig,
    });
  }

  query(
    sql: TaggedTemplateLiteralInvocation,
    values?: PrimitiveValueExpression[],
  ): Promise<QueryResult<any>> {
    return this.pool.query(sql, values);
  }

  async beforeApplicationShutdown(signal?: string): Promise<any> {
    // FIXME : remove or cleanup this after we found the issue with the db
    this.logger.warn(
      JSON.stringify({
        message: 'shutting down pool',
        signal,
        slonikPool: this.pool.getPoolState(),
      }),
    );
    await this.pool.end();
  }
}
