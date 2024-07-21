import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

export class AppRepository implements BaseRepository {
  constructor(private usersRepository: Repository<UserEntity>) {}

  findAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: ObjectId): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ _id: new ObjectId(id) });
  }

  createUser(data: UserDTO) {
    return this.usersRepository.save(data);
  }

  async saveUserBalance(user: User, balance: number) {
    user.balance = balance;
    await this.usersRepository.update({ _id: user._id }, user);

    return true;
  }
}
