import { Price } from '@/entity/price.entity';

export const priceAdapter = {
  resource: Price,
  options: {
    navigation: { name: 'Booking manager' },
    id: 'Prix',
    properties: {},
    actions: {
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
  },
};
