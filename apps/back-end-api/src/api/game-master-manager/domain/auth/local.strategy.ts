import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GameMasterAuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: GameMasterAuthService) {
    super({ usernameField: 'name' });
  }

  async validate(name: string, password: string): Promise<any> {
    const gameMaster = await this.authService.validateUser(name, password);
    if (!gameMaster) {
      throw new UnauthorizedException();
    }
    return gameMaster;
  }
}
