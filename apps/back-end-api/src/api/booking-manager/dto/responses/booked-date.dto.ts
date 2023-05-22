import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class BookedDateDto {
  @ApiProperty({
    type: [BookedDateDto],
    example: [
      { startDate: '2021-01-01', hour: '10:00' },
      { startDate: '2021-01-01', hour: '11:00' },
    ],
  })
  bookingDate: BookingDto[];
  @ApiProperty()
  @IsDate()
  start: Date;
  @ApiProperty()
  @IsDate()
  end: Date;
}

class BookingDto {
  @ApiProperty()
  @IsNumber()
  startDate: Date;
  @ApiProperty()
  @IsNumber()
  hour: string[];

  constructor(data: Partial<BookingDto> = {}) {
    Object.assign(this, data);
  }
}

export class UserBookedDateDto {
  @ApiProperty()
  @IsNumber()
  id: number;
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
}

export class NewBookingDateDto {
  @ApiProperty()
  @IsString()
  startDate: string;
  @ApiProperty()
  @IsString()
  timeSlot: string;
  @ApiProperty()
  @IsNumber()
  players: number;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNumber()
  scenarioId: number;
  @ApiProperty()
  @IsNumber()
  userId: number;
}

class RowsDto {
  @ApiProperty()
  id: number;
}
export class NewDateBookedResponseDTO {
  @ApiProperty({
    type: [RowsDto],
    example: [{ id: 1 }],
  })
  rows: RowsDto[];
  @ApiProperty()
  @IsNumber()
  rowCount: number;
}
