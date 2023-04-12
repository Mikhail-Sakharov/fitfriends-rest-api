import { Test, TestingModule } from '@nestjs/testing';
import { UserPurchasesService } from './user-purchases.service';

describe('UserPurchasesService', () => {
  let service: UserPurchasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPurchasesService],
    }).compile();

    service = module.get<UserPurchasesService>(UserPurchasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
