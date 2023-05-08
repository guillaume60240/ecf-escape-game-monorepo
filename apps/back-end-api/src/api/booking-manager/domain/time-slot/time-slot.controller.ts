import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimeSlotService } from './time-slot.service';
import { TimeSlotDto } from '../../dto/responses/time-slot.dto';

@ApiTags('Booking manager')
@Controller('time-slot')
export class TimeSlotController {
  constructor(private service: TimeSlotService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  @ApiResponse({
    status: 200,
    description: 'Liste des créneaux horaires',
    type: TimeSlotDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiOperation({
    summary: 'Get all time intervals ',
    description: 'Get all time intervals in a day',
  })
  async getTimeSlots(): Promise<TimeSlotDto[]> {
    return await this.service.getAllTimeSlots();
  }
}
