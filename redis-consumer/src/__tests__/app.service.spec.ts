import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bull';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '../__mocks__/app.repository';
import { AppService } from '../app.service';
import { UserEntity } from '../entities/user.entity';
import { REDIS_QUEUE_NAME } from '../utils/constants';

jest.mock('../app.repository', () => ({
  AppRepository: jest.fn().mockImplementation(() => new MockRepository()),
}));

describe('transfer', () => {
  let appService: AppService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    appService = moduleFixture.get<AppService>(AppService);
  });

  it('should return nothing when user has enough balance to transfer', async () => {
    expect(
      await appService.transfer({
        value: 50.5,
        payer: 2,
        payee: 1,
      }),
    ).toBe('');
  });

  it('should throw an error when payer type is "store"', () => {
    expect(async () => {
      await appService.transfer({
        value: 100.5,
        payer: 3,
        payee: 1,
      });
    }).rejects.toEqual(new Error('User cannot transfer.'));
  });

  it('should throw an error when payer does not have enough balance to transfer', () => {
    expect(async () => {
      await appService.transfer({
        value: 4050.6,
        payer: 1,
        payee: 3,
      });
    }).rejects.toEqual(new Error('Not enough balance to tranfer this value.'));
  });

  it('should throw an error when payer does not exist', () => {
    expect(async () => {
      await appService.transfer({
        value: 10,
        payer: 5,
        payee: 3,
      });
    }).rejects.toEqual(new Error('Payer not found'));
  });

  it('should throw an error when payee does not exist', () => {
    expect(async () => {
      await appService.transfer({
        value: 10,
        payer: 1,
        payee: 5,
      });
    }).rejects.toEqual(new Error('Payee not found'));
  });
});
