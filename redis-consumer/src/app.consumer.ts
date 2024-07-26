import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { REDIS_JOB_NAME, REDIS_QUEUE_NAME } from './utils/constants';

@Processor(REDIS_QUEUE_NAME)
export class AppConsumer {
  constructor(private readonly appService: AppService) {}

  @Process(REDIS_JOB_NAME)
  async processData({ data }: any) {
    Logger.log(`Processing data: ${JSON.stringify(data)}`);

    try {
      await this.appService.transfer(data);
      return { done: true };
    } catch (err: any) {
      Logger.log(`Error during data processing: ${err.message}`);
      return { done: true, error: err.message };
    }
  }

  @OnQueueActive()
  onActive(job: Job<unknown>) {
    Logger.log(`Starting job ${job.id}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job<unknown>) {
    Logger.log(`Job ${job.id} has been finished`);
  }

  @OnQueueError()
  onError(job: Job<unknown>, data) {
    Logger.log(`Job ${job.id} had an error ${JSON.stringify(data)}`);
  }
}
