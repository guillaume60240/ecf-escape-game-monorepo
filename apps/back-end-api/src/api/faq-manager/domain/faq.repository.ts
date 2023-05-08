import { Injectable } from '@nestjs/common';
import { SlonikService } from '../../../config/slonik/slonik.service';
import { sql } from 'slonik';
import { FaqEntity } from '../entity/faq.entity';

@Injectable()
export class FaqRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getAllFaq() {
    const { rows } = await this.slonik.query(sql`
            SELECT * FROM public.faq
        `);
    return rows as any as FaqEntity[];
  }
}
