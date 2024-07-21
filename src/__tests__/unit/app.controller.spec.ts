import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';

import { MockRepository } from '../../__mocks__/app.repository';
import { UserEntity } from '../../entities/user.entity';

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
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('create user', () => {
    it('should return created user', async () => {
      const data: UserDTO = {
        type: 'common',
        fullName: 'Pedro Silva',
        cpf: '1234567893',
        email: 'pedro@silva.com',
        password: '123456',
        balance: 120,
      };

      expect(await appController.createUser(data)).toBe(
        JSON.stringify({
          _id: 4,
          ...data,
        }),
      );
    });
  });

  describe('transfer', () => {
    it('should return nothing when user has enough balance to transfer', async () => {
      expect(
        await appController.transfer({
          value: 50.5,
          payer: 2,
          payee: 1,
        }),
      ).toBe('');
    });

    it('should throw an error when payer type is "store"', () => {
      expect(async () => {
        await appController.transfer({
          value: 100.5,
          payer: 3,
          payee: 1,
        });
      }).rejects.toEqual(new Error('User cannot transfer.'));
    });

    it('should throw an error when payer does not have enough balance to transfer', () => {
      expect(async () => {
        await appController.transfer({
          value: 4050.6,
          payer: 1,
          payee: 3,
        });
      }).rejects.toEqual(
        new Error('Not enough balance to tranfer this value.'),
      );
    });

    it('should throw an error when payer does not exist', () => {
      expect(async () => {
        await appController.transfer({
          value: 10,
          payer: 5,
          payee: 3,
        });
      }).rejects.toEqual(new Error('Payer not found'));
    });

    it('should throw an error when payee does not exist', () => {
      expect(async () => {
        await appController.transfer({
          value: 10,
          payer: 1,
          payee: 5,
        });
      }).rejects.toEqual(new Error('Payee not found'));
    });
  });

  describe('balance', () => {
    it('should return user balance', async () => {
      const spy = jest.spyOn(MockRepository.prototype, 'findUserById');

      expect(await appController.getBalance({ id: 2 })).toBe('13949.5');
      expect(await appController.getBalance({ id: 1 })).toBe('4050.5');

      expect(spy).toHaveBeenCalled();
    });
  });
});
