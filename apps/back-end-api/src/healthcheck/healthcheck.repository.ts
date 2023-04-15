import { SlonikService } from '../config/slonik/slonik.service';
import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';

@Injectable()
export class PostgreHealthcheckRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getHealthcheck(): Promise<boolean> {
    let request: boolean;
    try {
      await this.slonik.query(sql`SELECT 1 as healthcheck`);
      request = true;
    } catch (error) {
      console.error(error, this.constructor.name);
      request = false;
    }
    return request;
  }
}
