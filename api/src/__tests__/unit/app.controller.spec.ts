import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';

import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';

import { MockRepository } from '../../__mocks__/app.repository';
import { UserEntity } from '../../entities/user.entity';
import { getQueueToken } from '@nestjs/bull';
import { REDIS_QUEUE_NAME } from '../../utils/constants';

jest.mock('../../app.repository', () => ({
  AppRepository: jest.fn().mockImplementation(() => new MockRepository()),
}));

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: getEntityManagerToken(),
          useValue: {},
        },
        {
          provide: getQueueToken(REDIS_QUEUE_NAME),
          useValue: { add: jest.fn() },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('create user', () => {
    const data: UserDTO = {
      type: 'common',
      fullName: 'Pedro Silva',
      cpf: '1234567893',
      email: 'pedro@silva.com',
      password: '123456',
      balance: 120,
    };
    it('should return created user', async () => {
      expect(await appController.createUser(data)).toBe(
        JSON.stringify({
          _id: 4,
          ...data,
        }),
      );
    });

    it('should return error for duplicated email/cpf', async () => {
      expect(async () => {
        await appController.createUser(data);
      }).rejects.toEqual(new Error('Email and/or cpf already exists'));
    });
  });

  describe('balance', () => {
    it('should return user balance', async () => {
      const spy = jest.spyOn(MockRepository.prototype, 'findUserById');

      expect(await appController.getBalance({ id: 2 })).toBe('14000');
      expect(await appController.getBalance({ id: 1 })).toBe('4000');

      expect(spy).toHaveBeenCalled();
    });
  });
});
