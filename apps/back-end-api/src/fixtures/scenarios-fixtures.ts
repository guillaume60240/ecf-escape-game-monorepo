import { ScenarioDto } from '../scenarios-manager/dto/responses/scenario.dto';
export const scenariosEntityFixtures = [
  {
    id: 1,
    name: 'The Great Escape',
    description:
      'You are a prisoner in a concentration camp. You have to escape from the camp and reach the border. You have to be careful, the guards are everywhere and they are looking for you. You have to be fast and clever to succeed.',
    summary: 'You are a prisoner in a concentration camp.',
    min_players: 2,
    max_players: 6,
    duration: 60,
    difficulty: 3,
    pictures:
      'https://www.escaperoom.fr/wp-content/uploads/2019/03/escape-room-the-great-escape-1.jpg',
  },
  {
    id: 2,
    name: 'The Bank',
    description:
      'You are a thief and you have to steal a precious jewel from a bank. You have to be careful, the guards are everywhere and they are looking for you. You have to be fast and clever to succeed.',
    summary:
      'You are a thief and you have to steal a precious jewel from a bank.',
    min_players: 2,
    max_players: 6,
    duration: 60,
    difficulty: 3,
    pictures:
      'https://www.escaperoom.fr/wp-content/uploads/2019/03/escape-room-the-bank-1.jpg',
  },
];

export const scenariosDtoFixtures: ScenarioDto[] = [
  {
    id: 1,
    title: 'The Great Escape',
    description:
      'You are a prisoner in a concentration camp. You have to escape from the camp and reach the border. You have to be careful, the guards are everywhere and they are looking for you. You have to be fast and clever to succeed.',
    summary: 'You are a prisoner in a concentration camp.',
    minPlayers: 2,
    maxPlayers: 6,
    duration: 60,
    difficulty: 3,
    imgUrl:
      'https://www.escaperoom.fr/wp-content/uploads/2019/03/escape-room-the-great-escape-1.jpg',
  },
  {
    id: 2,
    title: 'The Bank',
    description:
      'You are a thief and you have to steal a precious jewel from a bank. You have to be careful, the guards are everywhere and they are looking for you. You have to be fast and clever to succeed.',
    summary:
      'You are a thief and you have to steal a precious jewel from a bank.',
    minPlayers: 2,
    maxPlayers: 6,
    duration: 60,
    difficulty: 3,
    imgUrl:
      'https://www.escaperoom.fr/wp-content/uploads/2019/03/escape-room-the-bank-1.jpg',
  },
];
