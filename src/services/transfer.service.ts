import { HttpException, HttpStatus } from '@nestjs/common';

export class TransferService {
  async execute(data: Transfer, repository: BaseRepository): Promise<string> {
    const payer = await repository.findUserById(data.payer);

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
    const payeeBalanceAfterTransfer = payee.balance + data.value;

    await repository.saveUserBalance(payer, payerBalanceAfterTransfer);
    await repository.saveUserBalance(payee, payeeBalanceAfterTransfer);

    return '';
  }
}
