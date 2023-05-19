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
    const startDatePeriod = sql`${startDate.toISOString().split('T')[0]} `;

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 3);
    const endPeriod = sql`${endDate.toISOString().split('T')[0]} `;
    const { rows } = await this.slonik.query(sql`
            SELECT 
                DATE_TRUNC(${granularity.period}, b.start_date) 
                    AS day,
                array_agg(b.time_slot) AS time_slots
            FROM public.booking b
            WHERE b.scenario_id = ${scenarioId}
                AND b.start_date >= ${startDatePeriod} 
                AND b.start_date < ${endPeriod}
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

  async getBookedDateWithUser(date: Date) {
    const { rows } = await this.slonik.query(sql`
            SELECT
                b.start_date AS date,
                b.time_slot AS hour,
                b.scenario_id AS scenarioid,
                s.name AS title,
                b.players AS players,
                b.price AS price,
                b.user_id AS userid,
                b.status AS status,
                b.id AS bookingid,
                u.name AS username,
                u.email AS useremail
            FROM public.booking b
            INNER JOIN public.scenario s ON s.id::integer = b.scenario_id
            INNER JOIN public.user u ON u.id::integer = b.user_id
            WHERE DATE_TRUNC('day', b.start_date) = ${date.toISOString()}
            ORDER by b.time_slot ASC
        `);
    return rows.map((row) => {
      return {
        startDate: new Date(row.date),
        hour: row.hour,
        scenarioId: row.scenarioid,
        scenarioTitle: row.title,
        players: row.players,
        price: row.price,
        userId: row.userid,
        userName: row.username,
        userEmail: row.useremail,
        status: row.status,
        bookingId: row.bookingid,
      };
    });
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
                s.name AS title,
                b.players AS players,
                b.price AS price,
                b.user_id AS userid
            FROM public.booking b
            INNER JOIN public.scenario s ON s.id::integer = b.scenario_id
            WHERE b.user_id = ${userId}
            ORDER by b.time_slot ASC
        `);
    return request.rows.map((row) => {
      return {
        id: row.id,
        startDate: new Date(row.date),
        hour: row.hour,
        scenarioId: row.scenarioid,
        scenarioTitle: row.title,
        players: row.players,
        price: row.price,
        userId: row.userid,
      };
    });
  }
}
