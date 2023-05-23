import { ScenarioEntity } from '@/api/scenarios-manager/entity/scenario.entity';
import { scenariosEntityFixtures } from '@/fixtures/scenarios-fixtures';
import { ScenarioRepository } from './scenarios.repository';
import { ScenarioService } from './scenarios.service';
import { mock } from 'jest-mock-extended';
import { scenariosDtoFixtures } from '@/fixtures/scenarios-fixtures';

describe('Scenario service', () => {
  let service: ScenarioService;
  const repository = mock<ScenarioRepository>();

  beforeEach(async () => {
    service = new ScenarioService(repository);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllScenarios', () => {
    it('should return a 200 status code if scenario is found', async () => {
      repository.getAllScenarios.mockResolvedValue(
        scenariosEntityFixtures as any as ScenarioEntity[],
      );

      const result = await service.getAllScenarios();

      expect(result).toEqual(scenariosDtoFixtures);
    });
  });
});
