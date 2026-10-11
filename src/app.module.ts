import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

const observeAppKey = process.env.OBSERVE_APP_KEY ?? '';
const observeAppSecret = process.env.OBSERVE_APP_SECRET ?? '';

if (Boolean(observeAppKey) !== Boolean(observeAppSecret)) {
  throw new Error('Set both OBSERVE_APP_KEY and OBSERVE_APP_SECRET, or leave both unset.');
}

//root module: imports all other modules
@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: observeAppKey,
      appSecret: observeAppSecret,
      serviceId: 'concepts',
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
