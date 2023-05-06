import { Injectable } from '@nestjs/common';
import { SlonikService } from '../../../../config/slonik/slonik.service';
import { BookingEntity } from '../../entity/booking.entity';
import { sql } from 'slonik';
import { BookedDateEntity } from '../../entity/booked-date.entity';

@Injectable()
export class BookingRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getAllBookings(): Promise<BookingEntity[]> {
    const { rows } = await this.slonik.query(sql`
                SELECT * FROM public.booking
            `);
    return rows as any as BookingEntity[];
  }

  async getBookingsByScenarioIdByStartDate(
    scenarioId: number,
    startDate: Date,
  ): Promise<BookedDateEntity> {
    const granularity = {
      period: 'day',
      datePart: sql`date_part('day', b.start_date)`,
    };
    const startDatePeriod = sql`${startDate.toISOString()}`;

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 3);
    const { rows } = await this.slonik.query(sql`
            SELECT 
                DATE_TRUNC(${granularity.period}, b.start_date) 
                    AS day,
                array_agg(b.time_slot) AS time_slots
            FROM public.booking b
            WHERE b.scenario_id = ${scenarioId}
                AND b.start_date >= ${startDatePeriod} 
                AND b.start_date < ${endDate.toISOString()}
            GROUP BY day
            ORDER BY day
        `);
    return {
      bookingDate: rows.map((row) => {
        return {
          startDate: new Date(row.day),
          hour: row.time_slots,
        };
      }),
      start: startDate,
      end: endDate,
    };
  }

  async createBooking(
    date: Date,
    timeSlot: string,
    userId: number,
    scenarioId: number,
    players: number,
    price: number,
  ) {
    const request = await this.slonik.query(sql`
            INSERT INTO public.booking(
                start_date, time_slot, user_id, scenario_id, players, price)
                VALUES (${date.toISOString()}, ${timeSlot}, ${userId}, ${scenarioId}, ${players}, ${price})
                RETURNING id;
        `);
    return request;
  }

  async getBookingsByUserId(userId: number) {
    const request = await this.slonik.query(sql`
            SELECT 
                b.start_date AS date,
                b.id AS id,
                b.time_slot AS hour,
                b.scenario_id AS scenarioid,
                b.players AS players,
                b.price AS price,
                b.user_id AS userid
            FROM public.booking b
            WHERE b.user_id = ${userId}
        `);
    return request.rows.map((row) => {
      return {
        id: row.id,
        startDate: new Date(row.date),
        hour: row.hour,
        scenarioId: row.scenarioid,
        players: row.players,
        price: row.price,
        userId: row.userid,
      };
    });
  }
}
