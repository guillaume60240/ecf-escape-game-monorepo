import { Injectable, NotFoundException } from '@nestjs/common';
import { ScenarioRepository } from './scenarios.repository';
import { ScenarioDto } from '../../dto/responses/scenario.dto';

@Injectable()
export class ScenarioService {
  constructor(private repository: ScenarioRepository) {}

  async getAllScenarios(): Promise<ScenarioDto[]> {
    const request = await this.repository.getAllScenarios();
    if (!request) throw new NotFoundException('No scenario found');

    return request.map((scenario) => {
      return {
        id: scenario.id,
        title: scenario.name,
        description: scenario.description,
        summary: scenario.summary,
        minPlayers: scenario.min_players,
        maxPlayers: scenario.max_players,
        duration: scenario.duration,
        difficulty: scenario.difficulty,
        imgUrl: scenario.pictures,
      };
    });
  }

  async getOneScenarioByIdWithPrice(id: number): Promise<ScenarioDto> {
    const request = await this.repository.getOneScenarioById(id);
    if (!request) throw new NotFoundException('No scenario found');
    return {
      id: request.id,
      title: request.name,
      description: request.description,
      summary: request.summary,
      minPlayers: request.min_players,
      maxPlayers: request.max_players,
      duration: request.duration,
      difficulty: request.difficulty,
      imgUrl: request.pictures,
    };
  }
}
