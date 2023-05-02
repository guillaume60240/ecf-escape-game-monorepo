import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { UserService } from 'src/user-manager/user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.body);
    const token = request.headers['authorization'].split(' ')[1];
    if (!token) return false;
    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded) return false;
    const user = decode(token) as JwtPayload;
    if (!user) return false;
    const userMail = user.email;
    if (!userMail) return false;
    try {
      const userFromDb = await this.userService.findOneByEmail(userMail);
      if (!userFromDb) return false;
    } catch (e) {
      return false;
    }
    return true;
  }
}
