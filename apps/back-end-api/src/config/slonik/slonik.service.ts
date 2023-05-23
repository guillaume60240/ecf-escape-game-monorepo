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
import { PostgresConfig } from './slonik.config';

@Injectable()
export class SlonikService implements BeforeApplicationShutdown {
  public readonly pool: DatabasePool;
  private readonly logger: Logger = new Logger('SlonikService');

  constructor(private readonly config: ConfigService) {
    const c = config.get<PostgresConfig>('postgres');
    if (!c.user || !c.password || !c.host || !c.port || !c.database) {
      throw new Error('Missing Postgres configuration');
    }
    const connectionUri = `postgres://${c.user}:${c.password}@${c.host}:${c.port}/${c.database}`;
    const interceptors = [
      new SlonikLoggingInterceptor({ logValues: false, logSQL: true }),
    ];
    const slonikConfig: Partial<ClientConfigurationInput> = {
      connectionRetryLimit: 2,
      connectionTimeout: 25000,
      idleInTransactionSessionTimeout: 20000,
      idleTimeout: 100,
      maximumPoolSize: 10,
      statementTimeout: 25000,
      transactionRetryLimit: 2,
      captureStackTrace: true,
      interceptors,
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
