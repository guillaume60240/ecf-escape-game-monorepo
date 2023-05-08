import { mock } from 'jest-mock-extended';
import { ScenariosController } from './scenarios.controller';
import { ScenarioService } from './scenarios.service';
import { scenariosDtoFixtures } from './../../../../fixtures/scenarios-fixtures';

describe('ScenariosController', () => {
  let controller: ScenariosController;
  const service = mock<ScenarioService>();

  beforeEach(() => {
    controller = new ScenariosController(service);

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllScenarios', () => {
    it('should return a 200 status code if scenario is found', async () => {
      service.getAllScenarios.mockResolvedValue(scenariosDtoFixtures);

      const result = await controller.getAllScenarios();

      expect(result).toEqual(scenariosDtoFixtures);
    });
  });
});
