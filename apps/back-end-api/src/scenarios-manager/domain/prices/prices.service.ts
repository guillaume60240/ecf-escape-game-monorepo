import { PricesRepository } from './prices.repository';
import { Injectable } from '@nestjs/common';
import { PricesDto } from '../../dto/responses/prices.dto';

@Injectable()
export class PricesService {
  constructor(private repository: PricesRepository) {}
  async getAllScenarios(): Promise<PricesDto[]> {
    const request = await this.repository.getAllPricesRange();

    return request.map((price) => ({
      minPlayers: price.min_players,
      maxPlayers: price.max_players,
      price: price.price,
    }));
  }
}
