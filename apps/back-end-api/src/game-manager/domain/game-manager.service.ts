import { Injectable } from '@nestjs/common';
import { GameManagerRepository } from './game-manager.repository';

@Injectable()
export class GameService {
  constructor(private repository: GameManagerRepository) {}

  async getGameRecordDurationByScenarioId(scenarioId: string): Promise<any> {
    const request = await this.repository.getGameRecordDurationByScenarioId(
      scenarioId,
    );
    return {
      duration: request.duration,
    };
  }
}
