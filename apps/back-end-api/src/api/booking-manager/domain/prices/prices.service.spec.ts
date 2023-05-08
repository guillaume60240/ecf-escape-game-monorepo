import { mock } from 'jest-mock-extended';
import { PricesService } from './prices.service';
import { PricesRepository } from './prices.repository';
import {
  pricesEntityFixtures,
  pricesFixtures,
} from '../../../../fixtures/prices.fixtures';

describe('PricesService', () => {
  let service: PricesService;
  const repository = mock<PricesRepository>();

  beforeEach(async () => {
    service = new PricesService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty array cause no result found', async () => {
    repository.getAllPricesRange.mockResolvedValue([] as any);
    const result = await service.getAllPricesRange();

    expect(result).toEqual([] as any);
  });

  it('should return an array of prices', async () => {
    repository.getAllPricesRange.mockResolvedValue(pricesEntityFixtures);

    const result = await service.getAllPricesRange();

    expect(result).toEqual(pricesFixtures);
  });
});
