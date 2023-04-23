import { Game } from 'src/entity/game.entity';

export const gameAdapter = {
  resource: Game,
  options: {
    navigation: { name: 'Game manager' },
    id: 'Parties',
    edit: {
      isAccessible: false,
      isVisible: true,
    },
    new: {
      isAccessible: false,
      isVisible: true,
    },
    delete: {
      isAccessible: false,
      isVisible: true,
    },
  },
};
