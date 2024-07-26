interface BaseRepository {
  findUserById(id: any): Promise<User>;
  saveUserBalance(session: any, user: User, balance: number): Promise<User>;
  getClientSession(): any;
}
