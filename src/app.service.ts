import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(request): string {
    console.log(request.body);
    return request.body.galop + 25;
  }
}
