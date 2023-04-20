import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { BookedDateDto } from '../../dto/responses/booked-date.dto';

@Injectable()
export class BookingService {
  constructor(private repository: BookingRepository) {}

  async getBookingsByScenarioIdByStartDate(
    scenarioId: string,
    startDate: Date,
  ): Promise<BookedDateDto> {
    return await this.repository.getBookingsByScenarioIdByStartDate(
      scenarioId,
      startDate,
    );
  }
}
