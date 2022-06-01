import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:HIU51Y7DdChw@54.89.222.190:5672/smartranking'],
        queue: 'admin-backend',
      },
    },
  );

  await app.listen();
}

bootstrap();
