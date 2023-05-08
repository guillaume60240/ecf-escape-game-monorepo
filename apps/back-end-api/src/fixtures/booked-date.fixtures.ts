import { BookedDateDto } from '../api/booking-manager/dto/responses/booked-date.dto';
import { BookedDateEntity } from '../api/booking-manager/entity/booked-date.entity';
export const bookedDateFixtures: BookedDateDto[] = [
  {
    bookingDate: [
      {
        startDate: new Date('2021-01-01'),
        hour: ['1', '2', '3', '4', '5'],
      },
      {
        startDate: new Date('2021-01-02'),
        hour: ['1', '2', '3', '4', '5'],
      },
    ],
    start: new Date('2021-01-01'),
    end: new Date('2021-01-03'),
  },
];

export const bookedDateEntityFixtures: BookedDateEntity[] = [
  {
    bookingDate: [
      {
        startDate: new Date('2021-01-01'),
        hour: ['1', '2', '3', '4', '5'],
      },
      {
        startDate: new Date('2021-01-02'),
        hour: ['1', '2', '3', '4', '5'],
      },
    ],
    start: new Date('2021-01-01'),
    end: new Date('2021-01-03'),
  },
];
