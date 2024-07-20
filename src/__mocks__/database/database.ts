const users: User[] = [
  {
    id: 0,
    type: 'common',
    balance: 4000,
  },
  {
    id: 1,
    type: 'common',
    balance: 14000,
  },
  {
    id: 2,
    type: 'store',
    balance: 100,
  },
];

export class MockDatabase implements Database {
  findAll(): User[] {
    return users;
  }

  findById(id): User {
    return users[id];
  }

  save(id: number, data: User): boolean {
    users[id] = data;
    return true;
  }
}
