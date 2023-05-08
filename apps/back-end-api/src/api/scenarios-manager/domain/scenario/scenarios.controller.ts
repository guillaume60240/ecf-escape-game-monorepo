import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScenarioService } from './scenarios.service';
import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ScenarioDto } from '../../dto/responses/scenario.dto';

@ApiTags('Scenarios manager')
@Controller('scenarios')
export class ScenariosController {
  constructor(private service: ScenarioService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  @ApiResponse({
    status: 200,
    description: 'Liste des scénarios ',
    type: ScenarioDto,
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
    summary: 'Get all scenarios ',
    description: 'Get all scenarios',
  })
  async getAllScenarios(): Promise<ScenarioDto[]> {
    return await this.service.getAllScenarios();
  }

  @Get('/:scenarioId')
  @Header('Cache-Control', 'no-store')
  @ApiResponse({
    status: 200,
    description: 'One scenario details',
    type: ScenarioDto,
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
    summary: 'Get one scenario ',
    description: 'Get on scenario by id',
  })
  async getOneScenarioByIdWithPrice(
    @Param('scenarioId') scenarioId: number,
  ): Promise<ScenarioDto> {
    return await this.service.getOneScenarioByIdWithPrice(scenarioId);
  }
}
