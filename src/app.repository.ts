export class AppRepository implements BaseRepository {
  async findAllUsers() {
    return [];
  }

  async findUserById(id: number) {
    const user: User = {
      id: id,
      type: 'common',
      balance: 0,
      fullName: 'Maria Silva',
      cpf: '1234567890',
      email: 'maria@silva.com',
      password: '12345',
    };

    return user;
  }

  async createUser(data: UserDTO) {
    console.log(data);
    const user: User = {
      id: 0,
      ...data,
    };

    return user;
  }

  async saveUserBalance(id: number, balance: number) {
    console.log(id, balance);
    return true;
  }
}
