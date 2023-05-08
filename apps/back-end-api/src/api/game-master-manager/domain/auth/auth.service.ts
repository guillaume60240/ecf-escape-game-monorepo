import { Injectable } from '@nestjs/common';
import { GameMasterService } from '../game-master.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class GameMasterAuthService {
  constructor(
    private service: GameMasterService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const gameMaster = await this.service.getGameMasterByName(name);
    if (!gameMaster) {
      return null;
    }
    const valid = await compare(pass, gameMaster.password);
    if (valid) return gameMaster;

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        algorithm: 'HS256',
      }),
      userId: user.id,
      userMail: user.email,
      userName: user.name,
    };
  }
}
