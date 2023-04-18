import { Scenario } from 'src/entity/scenario.entity';

export const scenarioAdapter = {
  resource: Scenario,
  options: {
    navigation: { name: 'Scenario manager' },
    id: 'Scénarios',
    properties: {},
  },
};
