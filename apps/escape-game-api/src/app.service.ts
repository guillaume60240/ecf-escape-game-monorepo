import { Injectable } from '@nestjs/common';
import { SlonikService } from './config/slonik/slonik.service';
import { sql } from 'slonik';
@Injectable()
export class AppService {
  constructor(private readonly slonik: SlonikService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getUser() {
    const { rows } = await this.slonik.query(sql`
      SELECT * FROM public.user
    `);

    return rows;
  }
}
