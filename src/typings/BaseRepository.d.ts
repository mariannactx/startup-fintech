interface BaseRepository {
  findAllUsers(): Promise<User[]>;
  findUserById(id: any): Promise<User>;
  createUser(data: UserDTO): Promise<User>;
  saveUserBalance(
    session: ClientSession,
    user: User,
    balance: number,
  ): Promise<User>;
  getClientSession(): ClientSession;
}

interface ClientSession {
  startTransaction: any;
  withTransaction: any;
  commitTransaction: any;
  abortTransaction: any;
  endSession: any;
}
