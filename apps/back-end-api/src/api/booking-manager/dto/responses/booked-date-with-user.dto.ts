import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class BookedDateWithUserDto {
  @ApiProperty()
  @IsDate()
  startDate: Date;
  @ApiProperty({
    example: ['10:00', '11:00'],
  })
  @IsString()
  hour: string;
  @ApiProperty()
  @IsNumber()
  scenarioId: number;
  @ApiProperty()
  @IsString()
  scenarioTitle: string;
  @ApiProperty()
  @IsNumber()
  players: number;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNumber()
  userId: number;
  @ApiProperty()
  @IsString()
  userName: string;
  @ApiProperty()
  @IsString()
  userEmail: string;
  @ApiProperty({ example: ['started', 'finished', 'pending'] })
  @IsString()
  status: 'started' | 'finished' | 'pending';
  @ApiProperty()
  @IsNumber()
  bookingId: number;
}
