import { mock } from 'jest-mock-extended';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';
import { bookedDateFixtures } from './../../../fixtures/booked-date.fixtures';
describe('BookingService', () => {
  let service: BookingService;
  const repository = mock<BookingRepository>();

  beforeEach(async () => {
    service = new BookingService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty array cause no result found', async () => {
    const scenarioId = '1';
    const date = new Date();
    repository.getBookingsByScenarioIdByStartDate.mockResolvedValue([] as any);
    const result = await service.getBookingsByScenarioIdByStartDate(
      scenarioId,
      date,
    );

    expect(result).toEqual([] as any);
  });

  it('should return an array of booked dates', async () => {
    const scenarioId = '1';
    const date = new Date('2021-01-01');
    repository.getBookingsByScenarioIdByStartDate.mockResolvedValue(
      bookedDateFixtures[0],
    );
    const result = await service.getBookingsByScenarioIdByStartDate(
      scenarioId,
      date,
    );

    expect(result).toEqual(bookedDateFixtures[0]);
  });
});
