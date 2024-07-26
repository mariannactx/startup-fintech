import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MongoEntityManager, Repository } from 'typeorm';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectEntityManager()
    private readonly entityManager: MongoEntityManager,
  ) {}
  async transfer(data: Transfer): Promise<any> {
    const repository = new AppRepository(
      this.usersRepository,
      this.entityManager,
    );

    const payer = await repository.findUserById(data.payer);

    if (!payer) {
      throw new Error('Payer not found');
    }

    if (payer.type == 'store') {
      throw new Error('User cannot transfer.');
    }

    const payerBalanceAfterTransfer = payer.balance - data.value;
    if (payerBalanceAfterTransfer < 0) {
      throw new Error('Not enough balance to tranfer this value.');
    }

    const payee = await repository.findUserById(data.payee);

    if (!payee) {
      throw new Error('Payee not found');
    }

    const payeeBalanceAfterTransfer = payee.balance + data.value;

    const session = repository.getClientSession();
    session.startTransaction();
    try {
      const payerResult = await repository.saveUserBalance(
        session,
        payer,
        payerBalanceAfterTransfer,
      );

      if (!payerResult) {
        throw new Error('An error occured. Please, try again.');
      }

      const payeeResult = await repository.saveUserBalance(
        session,
        payee,
        payeeBalanceAfterTransfer,
      );

      if (!payeeResult) {
        throw new Error('An error occured. Please, try again.');
      }
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();

      throw err;
    }

    return '';
  }
}
