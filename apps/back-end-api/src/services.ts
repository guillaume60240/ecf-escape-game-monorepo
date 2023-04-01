import { UserService } from './user-manager/user/user.service';
import { JwtService } from '@nestjs/jwt';

export const services = [
  // Add your services here
  UserService,
  JwtService,
];
