interface BaseRepository {
  findAllUsers(): Promise<User[]>;
  findUserById(id: any): Promise<User>;
  createUser(data: UserDTO): Promise<User>;
  saveUserBalance(session: any, user: User, balance: number): Promise<User>;
  getClientSession(): any;
}
