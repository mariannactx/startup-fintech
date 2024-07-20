const users: User[] = [
  {
    id: 1,
    type: 'common',
    balance: 4000,
    fullName: 'Maria Silva',
    cpf: '1234567890',
    email: 'maria@silva.com',
    password: '123456',
  },
  {
    id: 2,
    type: 'common',
    balance: 14000,
    fullName: 'João Silva',
    cpf: '1234567891',
    email: 'joao@silva.com',
    password: '123456',
  },
  {
    id: 3,
    type: 'store',
    balance: 100,
    fullName: 'Ana Silva',
    cpf: '1234567892',
    email: 'ana@silva.com',
    password: '123456',
  },
];

export class MockRepository implements BaseRepository {
  async findAllUsers() {
    return users;
  }

  async findUserById(id) {
    return users[id - 1];
  }

  async createUser(data: UserDTO) {
    const user = { id: users.length + 1, ...data };
    users.push(user);
    return user;
  }

  async saveUserBalance(id: number, balance: number) {
    users[id - 1].balance = balance;
    return true;
  }
}
