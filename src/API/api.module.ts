import { Module } from '@nestjs/common';
import { APIService } from './api.service';


@Module({
  providers: [APIService],
  exports: [APIService],
})
export class APIModule {}