import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { GameMasterService } from '../api/game-master-manager/domain/game-master.service';

@Injectable()
export class GameMasterGuard implements CanActivate {
  constructor(private gameMasterService: GameMasterService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers['authorization']) return false;
    const token = request.headers['authorization'].split(' ')[1];
    if (!token) return false;
    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded) return false;
    const user = decode(token) as JwtPayload;
    if (!user) return false;
    const userName = user.name;
    if (!userName) return false;
    try {
      const userFromDb = await this.gameMasterService.getGameMasterByName(
        userName,
      );
      if (!userFromDb) return false;
    } catch (e) {
      return false;
    }
    return true;
  }
}
