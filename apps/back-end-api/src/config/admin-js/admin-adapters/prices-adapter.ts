import { Price } from 'src/entity/price.entity';

export const pricesAdapter = {
  resource: Price,
  options: {
    navigation: { name: 'Scenario manager' },
    properties: {},
    label: 'Paliers de prix',
  },
};
