import { GameMaster } from '@/entity/game-master.entity';
import * as bcrypt from 'bcrypt';

export const gameMasterAdapter = {
  resource: GameMaster,
  options: {
    navigation: { name: 'Game Master manager', icon: 'User' },
    id: 'Game Masters',
    properties: {},
    listProperties: ['id', 'email', 'name'],
    filterProperties: ['email', 'name'],
    showProperties: ['email', 'name'],
    actions: {
      edit: {
        isAccessible: true,
        isVisible: true,
      },
      new: {
        isAccessible: true,
        isVisible: true,
        before: async (request, { currentAdmin }) => {
          const { password, ...otherParams } = request.payload;
          const encryptedPassword = await bcrypt.hash(password, 10);
          return {
            ...request,
            payload: {
              ...otherParams,
              password: encryptedPassword,
            },
          };
        },
      },
      delete: {
        isAccessible: true,
        isVisible: true,
      },
      list: {
        before: [],
        after: [],
      },
    },
  },
};
