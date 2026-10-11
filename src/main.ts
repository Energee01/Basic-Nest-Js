import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';

async function bootstrap() {
  //creating a nest js application instance
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  //start the application and listen to this port
  await app.listen(process.env.PORT ?? 3006);
}
bootstrap();
