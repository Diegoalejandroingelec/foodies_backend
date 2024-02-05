import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseService } from './firebase.service';

@Controller('module1')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Get('flaguardo')
  async getHello(@Req() request: any): Promise<string> {
    const docRef = this.firebaseService.getFirestore();
    const docSnapshot = await docRef.get();
    console.log(docSnapshot.data());
    return this.appService.getHello(request);
  }
  @Get('AI_recommendation')
  async d_1(@Req() request: any): Promise<string> {
    const docRef = this.firebaseService.getFirestore();
    const docSnapshot = await docRef.get();
    console.log(docSnapshot.data());
    return this.appService.getHello(request);
  }
}
