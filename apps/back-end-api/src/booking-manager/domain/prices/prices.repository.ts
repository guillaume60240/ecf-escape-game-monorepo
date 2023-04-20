import { PriceEntity } from './../../entity/price.entity';
import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';
import { SlonikService } from '../../../config/slonik/slonik.service';

@Injectable()
export class PricesRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getAllPricesRange(): Promise<PriceEntity[]> {
    const { rows } = await this.slonik.query(sql`
            SELECT * FROM public.price
        `);
    return rows as any as PriceEntity[];
  }
}
