import { User } from 'src/entity/user.entity';

const customBefore = (request, context) => {
  console.log(request);
  console.log(context);

  return request;
};

const customAfter = (originalResponse, request, context) => {
  console.log(originalResponse.meta);

  return originalResponse;
};

export const userAdapter = {
  resource: User,
  options: {
    navigation: { name: 'User manager', icon: 'User' },
    id: 'Utilisateurs',
    properties: {},
    listProperties: ['email', 'name'],
    filterProperties: ['email', 'name'],
    showProperties: ['email', 'name'],
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
        before: [customBefore],
        after: [customAfter],
      },
    },
  },
};
