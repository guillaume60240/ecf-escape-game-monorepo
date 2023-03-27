import { Module } from '@nestjs/common';
import { adminjsConfig } from './config/admin-js/admin-js.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [adminjsConfig, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
