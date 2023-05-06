import { BookingController } from './booking.controller';
import { mock } from 'jest-mock-extended';
import { BookingService } from './booking.service';
import { BookedDateDto } from '../../dto/responses/booked-date.dto';
import { bookedDateFixtures } from '../../../../fixtures/booked-date.fixtures';

describe('BookingController', () => {
  let controller: BookingController;
  const service = mock<BookingService>();
  beforeEach(async () => {
    controller = new BookingController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an empty array cause no result found', async () => {
    const scenarioId = 1;
    const date = new Date();
    service.getBookingsByScenarioIdByStartDate.mockResolvedValue(
      [] as any as BookedDateDto,
    );
    const result = await service.getBookingsByScenarioIdByStartDate(
      scenarioId,
      date,
    );

    expect(result).toEqual([] as any as BookedDateDto);
  });

  it('should return an array of booked dates', async () => {
    const scenarioId = 1;
    const date = new Date('2021-01-01');
    service.getBookingsByScenarioIdByStartDate.mockResolvedValue(
      bookedDateFixtures[0],
    );
    const result = await service.getBookingsByScenarioIdByStartDate(
      scenarioId,
      date,
    );

    expect(result).toEqual(bookedDateFixtures[0]);
  });
});
