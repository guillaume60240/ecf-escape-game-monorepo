import { GameService } from './game-manager.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
@ApiTags('Game manager')
@Controller('games')
export class GameController {
  constructor(private service: GameService) {}

  @Get('/record/:scenarioId')
  @Header('Cache-Control', 'no-store')
  @ApiResponse({
    status: 200,
    description: 'Record pour un scénario',
  })
  @ApiResponse({
    status: 404,
    description: 'Nothing found',
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiOperation({
    summary: 'Get Scenario record duratrion',
    description: 'The record duration for a scenario',
  })
  async getAllScenarios(
    @Param('scenarioId') scenarioId: string,
  ): Promise<any[]> {
    return await this.service.getGameRecordDurationByScenarioId(scenarioId);
  }
}
