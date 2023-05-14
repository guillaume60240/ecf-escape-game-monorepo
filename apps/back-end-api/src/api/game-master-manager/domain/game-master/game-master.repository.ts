import { SlonikService } from '../../../../config/slonik/slonik.service';
import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';

@Injectable()
export class GameMasterRepository {
  constructor(private readonly slonik: SlonikService) {}

  async findOneByName(name: string) {
    const { rows } = await this.slonik.query(sql`
            SELECT * FROM public.game_master
            WHERE name = ${name}
            `);
    return rows[0];
  }
}
