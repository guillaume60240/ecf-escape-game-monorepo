import { Injectable } from '@nestjs/common';
import { SlonikService } from '../../../../config/slonik/slonik.service';
import { TimeSlotEntity } from 'src/booking-manager/entity/time-slot.entity';
import { sql } from 'slonik';

@Injectable()
export class TimeSlotRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getAllTimeSlots(): Promise<TimeSlotEntity[]> {
    const { rows } = await this.slonik.query(sql`
                SELECT * FROM public.time_slot
            `);
    return rows as any as TimeSlotEntity[];
  }
}
