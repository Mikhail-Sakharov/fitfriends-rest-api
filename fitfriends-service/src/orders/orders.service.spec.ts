import {Test, TestingModule} from '@nestjs/testing';
import {OrdersService} from './orders.service';
import {OrdersRepository} from './orders.repository';
import {GymMembershipRepository} from './gym-membership.repository';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  const ApiOrdersRepositoryProvider = {
    provide: OrdersRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      getTrainingPurchases: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };
  const ApiGymMembershipRepositoryProvider = {
    provide: GymMembershipRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        OrdersRepository,
        GymMembershipRepository,
        ApiGymMembershipRepositoryProvider,
        ApiOrdersRepositoryProvider
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });
});
