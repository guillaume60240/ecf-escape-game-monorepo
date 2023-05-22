import { GameService } from './game-manager.service';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';
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
import { RecordDto } from '../dto/response/record.dto';
import {
  ClosedGameDto,
  GameDtoResponse,
  NewGameDtoResponse,
} from '../dto/response/game.dto';
@ApiTags('Game manager')
@Controller('games')
export class GameController {
  constructor(private service: GameService) {}

  @Get('/record/:scenarioId')
  @Header('Cache-Control', 'no-store')
  @ApiResponse({
    status: 200,
    description: 'Record pour un scénario',
    type: RecordDto,
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
  @ApiHeader({
    name: 'Bearer Token',
  })
  @Post('/new-game')
  @ApiResponse({
    status: 201,
    description: 'New Game',
    type: NewGameDtoResponse,
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
    description: 'New Game. For Game Master only',
  })
  async newGame(
    @Body('bookingId') bookingId: number,
    @Body('scenarioId') scenarioId: number,
  ): Promise<any[]> {
    return await this.service.newGame(+bookingId, +scenarioId);
  }
  @UseGuards(GameMasterGuard)
  @ApiHeader({
    name: 'Bearer Token',
  })
  @Post('/close-game')
  @ApiResponse({
    status: 201,
    description: 'Close the game',
    type: ClosedGameDto,
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
    description: 'New Game. For Game Master only',
  })
  async closeGAme(@Body('bookingId') bookingId: number): Promise<any[]> {
    return await this.service.closeGame(+bookingId);
  }

  @UseGuards(GameMasterGuard)
  @ApiHeader({
    name: 'Bearer Token',
  })
  @Get('/game/:bookingId')
  @ApiResponse({
    status: 200,
    description: 'Get Game',
    type: GameDtoResponse,
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
    description: 'Get Game. For Game Master only',
  })
  async getGame(@Param('bookingId') bookingId: number): Promise<any[]> {
    return await this.service.getGameByBookingId(+bookingId);
  }
}
