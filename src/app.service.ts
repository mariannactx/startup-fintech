import { Injectable } from '@nestjs/common';
import { TransferService } from './services/transfer.service';
import { GetBalanceService } from './services/getBalance.service';
import { AppDatabase } from './database/database';

@Injectable()
export class AppService {
  transfer(data: Transfer): string {
    return new TransferService().execute(data);
  }
  getBalance(id: number): string {
    const database = new AppDatabase();
    return new GetBalanceService().execute(id, database);
  }
}
