import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import {
  BookedDateDto,
  NewBookingDateDto,
} from '../../dto/responses/booked-date.dto';

@Injectable()
export class BookingService {
  constructor(private repository: BookingRepository) {}

  async getBookingsByScenarioIdByStartDate(
    scenarioId: number,
    startDate: Date,
  ): Promise<BookedDateDto> {
    return await this.repository.getBookingsByScenarioIdByStartDate(
      scenarioId,
      startDate,
    );
  }

  async getBookedDateWithUser(date: Date) {
    return await this.repository.getBookedDateWithUser(date);
  }

  async createBooking(newBookingDate: NewBookingDateDto) {
    const request = await this.repository.createBooking(
      new Date(newBookingDate.startDate),
      newBookingDate.timeSlot,
      +newBookingDate.userId,
      +newBookingDate.scenarioId,
      newBookingDate.players,
      newBookingDate.price,
    );
    return request;
  }

  async getBookedDateByUserId(userId: number) {
    return await this.repository.getBookingsByUserId(userId);
  }

  async getBookingDateById(id: number) {
    return await this.repository.getBookingDateById(id);
  }

  async updateBookedDateStatus(id: number, status: string) {
    return await this.repository.updateBookedDateStatus(id, status);
  }
}
