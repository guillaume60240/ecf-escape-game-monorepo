import { PricesDto } from 'src/api/booking-manager/dto/responses/prices.dto';
import { PriceEntity } from '../api/booking-manager/entity/price.entity';
export const pricesFixtures: PricesDto[] = [
  {
    minPlayers: 1,
    maxPlayers: 2,
    price: 20,
  },
  {
    minPlayers: 3,
    maxPlayers: 4,
    price: 15,
  },
  {
    minPlayers: 5,
    maxPlayers: 6,
    price: 10,
  },
];

export const pricesEntityFixtures: PriceEntity[] = [
  {
    min_players: 1,
    max_players: 2,
    price: 20,
  },
  {
    min_players: 3,
    max_players: 4,
    price: 15,
  },
  {
    min_players: 5,
    max_players: 6,
    price: 10,
  },
];
