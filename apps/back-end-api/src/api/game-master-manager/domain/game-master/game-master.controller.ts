import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameMasterGuard } from '../../../../guard/game-master.guard';
import { GameMasterService } from './game-master.service';
import { GameMasterDto } from '../../dto/game-master.dto';

@ApiTags('Game master manager')
@Controller('game-master')
export class GameMasterController {
  constructor(private gameMasterService: GameMasterService) {}
  @UseGuards(GameMasterGuard)
  @Post('/me')
  @ApiResponse({
    status: 200,
    description: 'Verif if game master is connected',
    type: GameMasterDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Non authorized',
  })
  @ApiOperation({
    summary: 'Get one game master',
    description: 'Verify who I am',
  })
  async getMe() {
    return true;
  }
}
