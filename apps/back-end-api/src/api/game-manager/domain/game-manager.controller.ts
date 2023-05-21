import { GameService } from './game-manager.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GameMasterGuard } from 'src/guard/game-master.guard';
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

  @UseGuards(GameMasterGuard)
  @Post('/new-game')
  @ApiResponse({
    status: 201,
    description: 'New Game',
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiOperation({
    summary: 'New Game',
    description: 'New Game',
  })
  async newGame(
    @Body('bookingId') bookingId: number,
    @Body('scenarioId') scenarioId: number,
  ): Promise<any[]> {
    return await this.service.newGame(+bookingId, +scenarioId);
  }
  @UseGuards(GameMasterGuard)
  @Post('/close-game')
  @ApiResponse({
    status: 201,
    description: 'Close the game',
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiOperation({
    summary: 'Close Game',
    description: 'New Game',
  })
  async closeGAme(@Body('bookingId') bookingId: number): Promise<any[]> {
    return await this.service.closeGame(+bookingId);
  }

  @UseGuards(GameMasterGuard)
  @Get('/game/:bookingId')
  @ApiResponse({
    status: 200,
    description: 'Get Game',
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiOperation({
    summary: 'Get Game',
    description: 'Get Game',
  })
  async getGame(@Param('bookingId') bookingId: number): Promise<any[]> {
    return await this.service.getGameByBookingId(+bookingId);
  }
}
