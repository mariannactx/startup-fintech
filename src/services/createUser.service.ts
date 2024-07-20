export class CreateUserService {
  async execute(data: UserDTO, repository: BaseRepository): Promise<string> {
    const user = await repository.createUser(data);
    return JSON.stringify(user);
  }
}
