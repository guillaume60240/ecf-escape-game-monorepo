import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';
import { SlonikService } from '../../../config/slonik/slonik.service';
import { ScenarioEntity } from '../../entity/scenario.entity';

@Injectable()
export class ScenarioRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getAllScenarios(): Promise<ScenarioEntity[]> {
    const { rows } = await this.slonik.query(sql`
            SELECT * FROM public.scenario
        `);
    return rows as any as ScenarioEntity[];
  }

  async getOneScenarioById(id: number): Promise<ScenarioEntity> {
    const { rows } = await this.slonik.query(sql`
            SELECT * FROM public.scenario
            WHERE public.scenario.id = ${id}
        `);
    return rows[0] as any as ScenarioEntity;
  }
}
