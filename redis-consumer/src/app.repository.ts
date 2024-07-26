import { UserEntity } from './entities/user.entity';
import { ClientSession, MongoEntityManager, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

export class AppRepository implements BaseRepository {
  constructor(
    private usersRepository: Repository<UserEntity>,
    private readonly entityManager: MongoEntityManager,
  ) {}

  getClientSession() {
    return this.entityManager.mongoQueryRunner.databaseConnection.startSession();
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async saveUserBalance(
    session: ClientSession,
    user: User,
    balance: number,
  ): Promise<UserEntity | null> {
    const oldBalance = user.balance;
    user.balance = balance;

    return (await this.usersRepository.manager
      .getMongoRepository(UserEntity)
      .findOneAndUpdate(
        { _id: user._id, balance: oldBalance },
        { $set: user },
        { session: session },
      )) as UserEntity;
  }
}
