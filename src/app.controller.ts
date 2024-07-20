import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('transfer')
  transfer(@Body() body: Transfer): string {
    return this.appService.transfer(body);
  }

  @Get('balance/:id')
  balance(@Param() params: { id: number }): string {
    return this.appService.getBalance(params.id);
  }
}
