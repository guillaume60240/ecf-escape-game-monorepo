import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RecordDto {
  @ApiProperty()
  @IsNumber()
  duration: number;
}
