import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { ArtificialIntelligenceModule } from 'src/AI/ai.module';

@Module({
  imports: [FirebaseModule, ArtificialIntelligenceModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
