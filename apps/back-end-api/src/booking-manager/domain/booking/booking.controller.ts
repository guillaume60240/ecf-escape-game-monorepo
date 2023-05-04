import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import {
  BookedDateDto,
  NewBookingDateDto,
} from '../../dto/responses/booked-date.dto';
import { UserGuard } from '../../../guard/user.guard';

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
    @Query('scenarioId') scenarioId: number,
  ) {
    return await this.service.getBookingsByScenarioIdByStartDate(
      scenarioId,
      new Date(date),
    );
  }

  @UseGuards(UserGuard)
  @Post('/new-booking')
  @ApiResponse({
    status: 201,
    description: 'Booking created',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Non authorized',
  })
  @ApiOperation({
    summary: 'Create booking',
    description: 'Create booking',
  })
  async createBooking(@Body() booking: NewBookingDateDto) {
    return await this.service.createBooking(booking);
  }

  @UseGuards(UserGuard)
  @Get('/booked-date/user/:userId')
  @ApiResponse({
    status: 200,
    description: 'Booked Date',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Non authorized',
  })
  @ApiOperation({
    summary: 'Get booked date by user id',
    description: 'Get booked date by user id',
  })
  async getBookedDateByUserId(@Param('userId') userId: number) {
    return await this.service.getBookedDateByUserId(userId);
  }

  /* @UseGuards(UserGuard)
  @Delete('/booked-date/:bookedDateId')
  @ApiResponse({
    status: 200,
    description: 'Booked Date deleted',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Non authorized',
  })
  @ApiOperation({
    summary: 'Delete booked date',
    description: 'Delete booked date',
  })
  async deleteBookedDate(@Param('bookedDateId') bookedDateId: number) {
    return await this.service.deleteBookedDate(bookedDateId);
  } */
}
