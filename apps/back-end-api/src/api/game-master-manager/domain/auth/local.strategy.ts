import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GameMasterAuthService } from './auth.service';

@Injectable()
export class GameMasterLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: GameMasterAuthService) {
    super({ usernameField: 'name' });
  }

  async validate(name: string, password: string, type: string): Promise<any> {
    if (type !== 'game-master') {
    }
    const gameMaster = await this.authService.validateGameMaster(
      name,
      password,
    );
    if (!gameMaster) {
      throw new UnauthorizedException();
    }
    return gameMaster;
  }
}
