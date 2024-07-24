export class GetAllUsersService {
  async execute(repository: BaseRepository): Promise<string> {
    const users = await repository.findAllUsers();
    return JSON.stringify(users);
  }
}
