import { Injectable } from '@nestjs/common';
import { TimeSlotRepository } from './time-slot.repository';
import { TimeSlotDto } from 'src/booking-manager/dto/responses/time-slot.dto';

@Injectable()
export class TimeSlotService {
  constructor(private repository: TimeSlotRepository) {}

  async getAllTimeSlots(): Promise<TimeSlotDto[]> {
    const request = this.repository.getAllTimeSlots();

    return (await request).map((timeSlot) => {
      return {
        id: timeSlot.id,
        hour: timeSlot.display_hour,
      };
    });
  }
}
