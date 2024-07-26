import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('')
  async createUser(@Body() body: UserDTO): Promise<string> {
    return await this.appService.createUser(body);
  }

  @Get('')
  async getAllUsers(): Promise<string> {
    return await this.appService.getAllUsers();
  }

  @Patch('transfer')
  async transfer(@Body() body: Transfer): Promise<any> {
    return await this.appService.transfer(body);
  }

  @Get('balance/:id')
  async getBalance(@Param() params: { id: number }): Promise<string> {
    return await this.appService.getBalance(params.id);
  }
}
