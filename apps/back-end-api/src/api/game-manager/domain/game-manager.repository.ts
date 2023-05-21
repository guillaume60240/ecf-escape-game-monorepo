import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';
import { SlonikService } from '../../../config/slonik/slonik.service';

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

  async newGame(bookingId: number, scenarioId: number): Promise<any> {
    const startedAt = new Date();
    const { rows } = await this.slonik.query(sql`
      INSERT INTO public.game (booking_id, scenario_id, started_at)
      VALUES (${bookingId}, ${scenarioId}, ${startedAt.toISOString()})
      RETURNING id
    `);
    return rows[0];
  }

  async closeGame(bookingId: number, duration: number): Promise<any> {
    const endedAt = new Date();
    const { rows } = await this.slonik.query(sql`
      UPDATE public.game
      SET ended_at = ${endedAt.toISOString()}
      , duration = ${duration}
      WHERE booking_id = ${bookingId}
      RETURNING booking_id
    `);
    return rows[0];
  }

  async getGameById(gameId: number): Promise<any> {
    const { rows } = await this.slonik.query(sql`
      SELECT * FROM public.game
      WHERE id = ${gameId}
    `);
    return rows[0];
  }

  async getGameByBookingId(bookingId: number): Promise<any> {
    const { rows } = await this.slonik.query(sql`
      SELECT * FROM public.game
      WHERE booking_id = ${bookingId}
    `);
    return rows[0];
  }
}
