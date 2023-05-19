import { Module } from '@nestjs/common';
import { GameMasterAuthService } from './auth.service';
import { GameMasterAuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GameMasterLocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { GameMasterJwtStrategy } from './jwt.strategy';
import { GameMasterService } from '../game-master/game-master.service';
import { GameMasterRepository } from '../game-master/game-master.repository';
import { SlonikModule } from '../../../../config/slonik/slonik.module';

@Module({
  controllers: [GameMasterAuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    SlonikModule,
  ],
  providers: [
    GameMasterAuthService,
    GameMasterLocalStrategy,
    GameMasterJwtStrategy,
    GameMasterService,
    GameMasterRepository,
  ],
  exports: [GameMasterAuthService],
})
export class GameMasterAuthModule {}

/***
 * expiresIn: expressed in seconds or a string describing a time span vercel/ms.
Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
 *
 */
