import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { MongoEntityManager, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserService } from './services/createUser.service';
import { TransferService } from './services/transfer.service';
import { GetBalanceService } from './services/getBalance.service';

@Injectable()
export class AppService {
  private repository: BaseRepository;
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectEntityManager()
    private readonly entityManager: MongoEntityManager,
  ) {
    this.repository = new AppRepository(
      this.usersRepository,
      this.entityManager,
    );
  }
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
