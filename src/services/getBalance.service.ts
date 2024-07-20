export class GetBalanceService {
  execute(id: number, database: Database): string {
    return `${database.findById(id).balance}`;
  }
}
