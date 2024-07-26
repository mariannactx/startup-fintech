const users: User[] = [
  {
    _id: 1,
    type: 'common',
    balance: 4000,
    fullName: 'Maria Silva',
    cpf: '1234567890',
    email: 'maria@silva.com',
    password: '123456',
  },
  {
    _id: 2,
    type: 'common',
    balance: 14000,
    fullName: 'João Silva',
    cpf: '1234567891',
    email: 'joao@silva.com',
    password: '123456',
  },
  {
    _id: 3,
    type: 'store',
    balance: 100,
    fullName: 'Ana Silva',
    cpf: '1234567892',
    email: 'ana@silva.com',
    password: '123456',
  },
];

export class MockRepository implements BaseRepository {
  async findUserById(id) {
    return users[id - 1];
  }

  async saveUserBalance(session: any, user: User, balance: number) {
    const id = user._id - 1;
    users[id].balance = balance;
    return users[id];
  }

  getClientSession() {
    return {
      startTransaction: () => {},
      commitTransaction: () => {},
      abortTransaction: () => {},
      endSession: () => {},
    };
  }
}
