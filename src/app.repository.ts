import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

export class AppRepository implements BaseRepository {
  constructor(private usersRepository: Repository<UserEntity>) {}

  findAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findUserById(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(data: UserDTO) {
    const user: User = {
      id: 0,
      ...data,
    };
    return this.usersRepository.save(user);
  }

  async saveUserBalance(id: number, balance: number) {
    const user = await this.usersRepository.findOneBy({ id });

    user.balance = balance;
    await this.usersRepository.save(user);

    return true;
  }
}
