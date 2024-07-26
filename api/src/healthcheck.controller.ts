import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HealthcheckController {
  constructor() {}

  @Get('')
  healthcheck(): string {
    return 'ok';
  }
}
