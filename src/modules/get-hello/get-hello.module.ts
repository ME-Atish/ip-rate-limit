import { Module } from '@nestjs/common';
import { GetHelloController } from './get-hello.controller';

@Module({
  controllers: [GetHelloController],
})
export class GetHelloModule {}
