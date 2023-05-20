import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewGameDto {
  @ApiProperty()
  @IsNumber()
  bookingId: number;
  @ApiProperty()
  @IsNumber()
  scenarioId: number;
}
