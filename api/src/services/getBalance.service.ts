import { HttpException, HttpStatus } from '@nestjs/common';

export class GetBalanceService {
  async execute(id: number, repository: BaseRepository): Promise<string> {
    const user = await repository.findUserById(id);

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return `${user.balance}`;
  }
}
