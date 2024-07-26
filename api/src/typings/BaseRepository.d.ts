interface BaseRepository {
  findAllUsers(): Promise<User[]>;
  findUserById(id: any): Promise<User>;
  createUser(data: UserDTO): Promise<User>;
}
