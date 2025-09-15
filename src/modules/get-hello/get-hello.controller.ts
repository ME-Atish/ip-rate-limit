import { Controller, Get } from '@nestjs/common';

@Controller('get-hello')
export class GetHelloController {
  @Get()
  getHello(): string {
    return 'hello world';
  }
}
