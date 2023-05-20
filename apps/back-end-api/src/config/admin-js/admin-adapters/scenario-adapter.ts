import { Scenario } from 'src/entity/scenario.entity';

export const scenarioAdapter = {
  resource: Scenario,
  options: {
    navigation: { name: 'Scenario manager' },
    id: 'Scénarios',
    properties: {},
    listProperties: ['name'],
    filterProperties: ['name'],
    showProperties: [
      'name',
      'description',
      'difficulty',
      'duration',
      'min_players',
      'max_players',
      'summary',
    ],
  },
};
