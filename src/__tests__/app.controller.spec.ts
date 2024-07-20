import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';

import { MockDatabase } from '../__mocks__/database/database';

jest.mock('../database/database', () => ({
  AppDatabase: jest.fn().mockImplementation(() => new MockDatabase()),
}));

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('transfer', () => {
    it('should return nothing', () => {
      expect(
        appController.transfer({
          value: 100.5,
          payer: 4,
          payee: 15,
        }),
      ).toBe('');
    });
  });

  describe('balance', () => {
    it('should return user balance', () => {
      const spy = jest.spyOn(MockDatabase.prototype, 'findById');

      expect(appController.balance({ id: 2 })).toBe('100');
      expect(spy).toHaveBeenCalled();
    });
  });
});
