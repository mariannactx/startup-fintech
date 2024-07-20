import { Injectable } from '@nestjs/common';
import { TransferService } from './services/transfer.service';
import { GetBalanceService } from './services/getBalance.service';
import { AppRepository } from './app.repository';
import { CreateUserService } from './services/createUser.service';

@Injectable()
export class AppService {
  async createUser(data: UserDTO): Promise<string> {
    const repository = new AppRepository();
    return await new CreateUserService().execute(data, repository);
  }

  async transfer(data: Transfer): Promise<string> {
    const repository = new AppRepository();
    return await new TransferService().execute(data, repository);
  }

  async getBalance(id: number): Promise<string> {
    const repository = new AppRepository();
    return await new GetBalanceService().execute(id, repository);
  }
}
