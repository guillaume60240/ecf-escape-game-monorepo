import { Logger } from '@nestjs/common';
import {
  Interceptor,
  Query,
  QueryContext,
  QueryResult,
  QueryResultRow,
} from 'slonik';

// this is based on the logger interceptor from slonik-interceptor-query-logging
export type SloninkLoggingInterceptorConfig = {
  logValues?: boolean;
  logSQL?: boolean;
};

interface CallSite {
  fileName: string | null | undefined;
  lineNumber: number;
  columnNumber: number;
}

export class SlonikLoggingInterceptor implements Interceptor {
  private logger = new Logger('SlonikLoggingInterceptor');
  configuration?: SloninkLoggingInterceptorConfig;

  constructor(configuration?: SloninkLoggingInterceptorConfig) {
    this.configuration = {
      logValues: configuration?.logValues ?? false,
      logSQL: configuration?.logSQL ?? false,
    };
  }

  private static stringifyCallSite(callSite: CallSite) {
    return (
      (callSite.fileName || '') +
      ':' +
      callSite.lineNumber +
      ':' +
      callSite.columnNumber
    );
  }

  afterPoolConnection() {
    this.logger.debug('connected to the pool');
    return null;
  }

  beforePoolConnectionRelease() {
    this.logger.debug('releasing pool connection');
    return null;
  }

  afterQueryExecution(
    context: QueryContext,
    query: Query,
    result: QueryResult<QueryResultRow>,
  ) {
    let rowCount: number | null = null;

    if (result.rowCount) {
      rowCount = result.rowCount;
    }

    for (const notice of result.notices) {
      if (!notice.message) {
        continue;
      }

      this.logger.debug(notice.message);
    }

    this.logger.debug({
      message: 'query execution result',
      executionTime:
        Number(process.hrtime.bigint() - BigInt(context.queryInputTime)) /
        1_000_000,
      rowCount,
    });

    return null;
  }

  async beforeQueryExecution(context: QueryContext, query: Query) {
    let stackTrace;

    if (context.stackTrace) {
      stackTrace = [];

      for (const callSite of context.stackTrace) {
        // Hide the internal call sites.
        if (
          callSite.fileName !== null &&
          !callSite.fileName.includes('slonik') &&
          !callSite.fileName.includes('next_tick')
        ) {
          stackTrace.push(SlonikLoggingInterceptor.stringifyCallSite(callSite));
        }
      }
    }

    let values;

    if (this.configuration?.logValues) {
      values = [];

      for (const value of query.values) {
        if (Buffer.isBuffer(value)) {
          values.push('[Buffer ' + value.byteLength + ']');
        } else {
          values.push(value);
        }
      }
    }

    let sql;

    if (this.configuration?.logSQL) {
      sql = query.sql;
    }

    this.logger.debug({
      message: 'executing query',
      sql,
      stackTrace,
      values,
    });

    return null;
  }
}
