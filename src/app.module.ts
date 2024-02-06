import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, FirebaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
