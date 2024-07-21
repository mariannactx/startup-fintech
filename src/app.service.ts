import { Injectable } from '@nestjs/common';
import { TransferService } from './services/transfer.service';
import { GetBalanceService } from './services/getBalance.service';
import { AppRepository } from './app.repository';
import { CreateUserService } from './services/createUser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AppService {
  private repository: BaseRepository;
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    this.repository = new AppRepository(this.usersRepository);
  }

  async createUser(data: UserDTO): Promise<string> {
    return await new CreateUserService().execute(data, this.repository);
  }

  async transfer(data: Transfer): Promise<string> {
    return await new TransferService().execute(data, this.repository);
  }

  async getBalance(id: number): Promise<string> {
    return await new GetBalanceService().execute(id, this.repository);
  }
}
