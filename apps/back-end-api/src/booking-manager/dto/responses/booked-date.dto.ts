import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

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
