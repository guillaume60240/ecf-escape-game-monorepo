import { Injectable } from '@nestjs/common';
import { SlonikService } from '../../../config/slonik/slonik.service';
import { BookingEntity } from 'src/booking-manager/entity/booking.entity';
import { sql } from 'slonik';
import { BookedDateEntity } from 'src/booking-manager/entity/booked-date.entity';

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
    scenarioId: string,
    startDate: Date,
  ): Promise<BookedDateEntity> {
    const granularity = {
      period: 'day',
      datePart: sql`date_part('day', b.start_date)`,
    };
    const startDatePeriod = sql`${startDate.toISOString()}`;
    console.log('startDate= >', startDate);

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
}
