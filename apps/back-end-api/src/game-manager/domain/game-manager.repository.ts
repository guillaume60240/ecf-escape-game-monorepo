import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';
import { SlonikService } from '../../config/slonik/slonik.service';

@Injectable()
export class GameManagerRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getGameRecordDurationByScenarioId(scenarioId: string): Promise<any> {
    const { rows } = await this.slonik.query(sql`
      SELECT duration AS duration FROM public.game 
      WHERE public.game.scenario_id = ${scenarioId}
      ORDER by duration ASC
      LIMIT 1
    `);
    return rows[0];
  }
}
