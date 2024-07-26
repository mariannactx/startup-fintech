import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BullModule } from '@nestjs/bull';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { AppConsumer } from './app.consumer';
import { REDIS_QUEUE_NAME } from './utils/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'mongo',
      port: 27017,
      directConnection: true,
      database: 'fintech',
      synchronize: false,
      entities: [UserEntity],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: REDIS_QUEUE_NAME,
    }),
  ],
  controllers: [],
  providers: [AppService, AppConsumer],
  exports: [BullModule],
})
export class AppModule {}
