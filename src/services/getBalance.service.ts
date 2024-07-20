export class GetBalanceService {
  async execute(id: number, repository: BaseRepository): Promise<string> {
    const user = await repository.findUserById(id);
    return `${user.balance}`;
  }
}
