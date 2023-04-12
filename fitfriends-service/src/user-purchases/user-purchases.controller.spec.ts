import {Test, TestingModule} from '@nestjs/testing';
import {UserPurchasesController} from './user-purchases.controller';

describe('UserPurchasesController', () => {
  let controller: UserPurchasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPurchasesController],
    }).compile();

    controller = module.get<UserPurchasesController>(UserPurchasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
