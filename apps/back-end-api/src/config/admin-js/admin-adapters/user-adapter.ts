import { User } from 'src/entity/user.entity';

export const userAdapter = {
  ressource: User,
  options: {
    properties: {},
    listProperties: ['id', 'email', 'name'],
    filterProperties: ['email', 'name'],
    editProperties: ['email'],
    showProperties: ['email', 'name'],
    label: 'Utilisateurs',
  },
};
