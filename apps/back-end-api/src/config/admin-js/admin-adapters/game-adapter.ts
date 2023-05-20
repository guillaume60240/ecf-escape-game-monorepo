import { Game } from 'src/entity/game.entity';

const customBefore = (request, context) => {
  return request;
};
export const gameAdapter = {
  resource: Game,
  options: {
    navigation: { name: 'Game manager' },
    id: 'Parties',
    listProperties: ['started_at', 'ended_at', 'scenario_id', 'duration'],
    filterProperties: ['started_at', 'scenario_id'],
    showProperties: ['started_at', 'ended_at', 'scenario_id', 'duration'],
    properties: {
      started_at: {
        type: 'datetime',
        label: 'Heure de début',
      },
      ended_at: {
        type: 'datetime',
        label: 'Heure de fin',
      },
      scenario_id: {
        type: 'number',
        label: 'Scénario',
      },
      duration: {
        type: 'number',
        label: 'Durée',
      },
    },
    actions: {
      edit: {
        isAccessible: false,
        isVisible: false,
      },
      new: {
        isAccessible: false,
        isVisible: false,
      },
      delete: {
        isAccessible: false,
        isVisible: false,
      },
      list: {
        isAccessible: true,
        isVisible: true,
        before: [customBefore],
      },
    },
  },
};
