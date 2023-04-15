import {Test, TestingModule} from '@nestjs/testing';
import {OrdersService} from 'src/orders/orders.service';
import {UserPurchasesService} from './user-purchases.service';

describe('AuthService', () => {
  let userPurchasesService: UserPurchasesService;
  const ApiOrdersServiceProvider = {
    provide: OrdersService,
    useFactory: () => ({
      getOrdersWithStatistics: jest.fn(),
      createOrder: jest.fn(),
      createGymOrder: jest.fn(),
      getOrders: jest.fn(),
      getTrainingPurchases: jest.fn(),
      getGymPurchases: jest.fn(),
      showOrder: jest.fn(),
      deactivateOrder: jest.fn(),
      incrementTrainingsCount: jest.fn(),
      incrementGymsCount: jest.fn(),
      decrementTrainingsCount: jest.fn(),
      decrementGymsCount: jest.fn(),
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [
          UserPurchasesService,
          OrdersService,
          ApiOrdersServiceProvider
        ]
      })
      .compile();

      userPurchasesService = moduleRef.get<UserPurchasesService>(UserPurchasesService);
  });

  it('should be defined', () => {
    expect(userPurchasesService).toBeDefined();
  });
});
