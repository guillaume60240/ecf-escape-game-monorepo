import { PostgreHealthcheckRepository } from './healthcheck.repository';
import { HealthcheckServiceCustom } from './healthcheck.service';
import { mock } from 'jest-mock-extended';

describe('HealthcheckService', () => {
  let service: HealthcheckServiceCustom;

  const repository = mock<PostgreHealthcheckRepository>();

  beforeEach(() => {
    service = new HealthcheckServiceCustom(repository);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
