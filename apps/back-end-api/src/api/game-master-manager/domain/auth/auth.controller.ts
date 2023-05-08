import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GameMasterAuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users manager')
@Controller('game-master-manager/auth')
export class GameMasterAuthController {
  constructor(private authService: GameMasterAuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }
}
