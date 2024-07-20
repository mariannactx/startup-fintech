export class AppDatabase implements Database {
  findAll(): User[] {
    return [];
  }
  findById(id: number): User {
    return { id: id, type: 'common', balance: 0 };
  }
  save(id: number, data: User): boolean {
    console.log(id, data);
    return true;
  }
}
