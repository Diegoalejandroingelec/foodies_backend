import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
