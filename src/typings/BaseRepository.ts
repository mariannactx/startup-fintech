interface BaseRepository {
  findAllUsers(): Promise<User[]>;
  findUserById(id: number): Promise<User>;
  createUser(data: UserDTO): Promise<User>;
  saveUserBalance(id: number, balance: number): Promise<boolean>;
}
