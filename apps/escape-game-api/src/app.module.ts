import { Module } from '@nestjs/common';
import { SlonikModule } from './config/slonik/slonik.module';
import { AdminModule } from '@adminjs/nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

//FOR ADMINJS
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
    SlonikModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
