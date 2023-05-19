import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalUserStrategy } from './local-user.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { SlonikModule } from '../../../config/slonik/slonik.module';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    SlonikModule,
  ],
  providers: [
    AuthService,
    {
      provide: 'local-user',
      useClass: LocalUserStrategy,
    },
    JwtStrategy,
    UserService,
    UserRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}

/***
 * expiresIn: expressed in seconds or a string describing a time span vercel/ms.
Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
 *
 */
