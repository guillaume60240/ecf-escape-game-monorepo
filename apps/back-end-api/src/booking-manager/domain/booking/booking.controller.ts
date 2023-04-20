import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { BookedDateDto } from '../../dto/responses/booked-date.dto';

@ApiTags('Booking manager')
@Controller('booking')
export class BookingController {
  constructor(private service: BookingService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description:
      'Liste des dates réservées pour un scénario dans un intervalle de temps',
    type: BookedDateDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiOperation({
    summary: 'Get booked dates',
    description: 'Get booked dates for a scenario in a time interval',
  })
  async getBookingsByScenarioIdByStartDate(
    @Query('date') date: Date,
    @Query('scenarioId') scenarioId: string,
  ) {
    return await this.service.getBookingsByScenarioIdByStartDate(
      scenarioId,
      new Date(date),
    );
  }
}
