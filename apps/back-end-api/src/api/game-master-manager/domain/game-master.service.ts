import { GameMasterRepository } from './game-master.repository';
import { Injectable } from '@nestjs/common';
import { GameMasterDto } from '../dto/game-master.dto';

@Injectable()
export class GameMasterService {
  constructor(private readonly gameMasterRepository: GameMasterRepository) {}

  async getGameMasterByName(name: string): Promise<GameMasterDto> {
    return await this.gameMasterRepository.findOneByName(name);
  }
}
