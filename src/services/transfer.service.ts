import { HttpException, HttpStatus } from '@nestjs/common';

export class TransferService {
  async execute(data: Transfer, repository: BaseRepository): Promise<string> {
    const payer = await repository.findUserById(data.payer);

    if (!payer) {
      throw new HttpException('Payer not found', HttpStatus.NOT_FOUND);
    }

    if (payer.type == 'store') {
      throw new HttpException(
        'User cannot transfer.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const payerBalanceAfterTransfer = payer.balance - data.value;
    if (payerBalanceAfterTransfer < 0) {
      throw new HttpException(
        'Not enough balance to tranfer this value.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const payee = await repository.findUserById(data.payee);

    if (!payee) {
      throw new HttpException('Payee not found', HttpStatus.NOT_FOUND);
    }

    const payeeBalanceAfterTransfer = payee.balance + data.value;

    await repository.saveUserBalance(payer, payerBalanceAfterTransfer);
    await repository.saveUserBalance(payee, payeeBalanceAfterTransfer);

    return '';
  }
}
