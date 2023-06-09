import { BookingService } from '@/api/booking-manager/domain/booking/booking.service';
import { GameManagerRepository } from './game-manager.repository';
import { GameService } from './game-manager.service';
import { mock } from 'jest-mock-extended';

describe('Game Manager service', () => {
  let service: GameService;
  const repository = mock<GameManagerRepository>();
  const bookingService = mock<BookingService>();
  beforeEach(async () => {
    service = new GameService(repository, bookingService);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGameRecordDurationByScenarioId', () => {
    it('should return a 200 status code if scenario is found', async () => {
      repository.getGameRecordDurationByScenarioId.mockResolvedValue({
        duration: 10,
      });

      const result = await service.getGameRecordDurationByScenarioId(
        'scenarioId',
      );

      expect(result).toEqual({ duration: 10 });
    });
  });
});
