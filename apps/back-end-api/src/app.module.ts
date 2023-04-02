import { AuthModule } from './user-manager/auth/auth.module';
import { Module } from '@nestjs/common';
import { adminjsConfig } from './config/admin-js/admin-js.config';
import { SlonikModule } from './config/slonik/slonik.module';

import { DatabaseModule } from './config/database/database.module';
import { controllers } from './controllers';
import { services } from './services';
import { repositories } from './repositories';

@Module({
  imports: [adminjsConfig, DatabaseModule, SlonikModule, AuthModule],
  controllers: [...controllers],
  providers: [...repositories, ...services],
})
export class AppModule {}
