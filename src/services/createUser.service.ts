import { HttpException, HttpStatus } from '@nestjs/common';
import { MongoServerError } from 'mongodb';

export class CreateUserService {
  async execute(data: UserDTO, repository: BaseRepository): Promise<string> {
    try {
      const user = await repository.createUser(data);
      return JSON.stringify(user);
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        throw new HttpException(
          'Email and/or cpf already exists',
          HttpStatus.CONFLICT,
        );
      }

      throw err;
    }
  }
}
