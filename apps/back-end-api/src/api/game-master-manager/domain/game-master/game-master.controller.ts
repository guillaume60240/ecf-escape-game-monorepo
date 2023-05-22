import {
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameMasterGuard } from '../../../../guard/game-master.guard';

@ApiTags('Game master manager')
@Controller('game-master')
export class GameMasterController {
  @UseGuards(GameMasterGuard)
  @ApiHeader({
    name: 'Bearer Token',
  })
  @Post('/me')
  @ApiResponse({
    status: 200,
    description: 'Verif if game master is connected',
    type: Boolean,
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
    description: 'Verify who I am. For game master',
  })
  async getMe() {
    return true;
  }
}
