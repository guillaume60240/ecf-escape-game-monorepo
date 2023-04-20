import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TimeSlotDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  hour: string;
}
