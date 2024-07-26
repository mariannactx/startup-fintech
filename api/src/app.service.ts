import { Inject, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { GetAllUsersService } from './services/getAllUsers';
import { CreateUserService } from './services/createUser.service';
import { GetBalanceService } from './services/getBalance.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { REDIS_JOB_NAME, REDIS_QUEUE_NAME } from './utils/constants';

@Injectable()
export class AppService {
  private repository: BaseRepository;
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectQueue(REDIS_QUEUE_NAME) private redisQueue: Queue,
  ) {
    this.repository = new AppRepository(this.usersRepository);
  }

  async getAllUsers(): Promise<string> {
    return await new GetAllUsersService().execute(this.repository);
  }

  async createUser(data: UserDTO): Promise<string> {
    return await new CreateUserService().execute(data, this.repository);
  }

  async transfer(data: Transfer): Promise<any> {
    return await this.redisQueue.add(REDIS_JOB_NAME, data);
  }

  async getBalance(id: number): Promise<string> {
    return await new GetBalanceService().execute(id, this.repository);
  }
}
