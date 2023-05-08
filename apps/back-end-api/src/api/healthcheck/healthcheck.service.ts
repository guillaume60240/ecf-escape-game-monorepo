import { Injectable } from '@nestjs/common';
import { HealthCheckStatus } from '@nestjs/terminus';
import { PostgreHealthcheckRepository } from './healthcheck.repository';

@Injectable()
export class HealthcheckServiceCustom {
  constructor(private repository: PostgreHealthcheckRepository) {}

  async healthService(): Promise<HealthCheckStatus> {
    const isHealthy = await this.repository.getHealthcheck();

    return isHealthy ? 'ok' : 'error';
  }
}
