import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SlonikService } from './slonik.service';

@Module({
  imports: [ConfigModule],
  providers: [SlonikService],
  exports: [SlonikService],
})
export class SlonikModule {}
