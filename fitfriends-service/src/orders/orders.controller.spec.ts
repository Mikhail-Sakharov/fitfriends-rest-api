import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {OrdersService} from './orders.service';
import {OrdersController} from './orders.controller';
import {UserRole} from 'src/types/user-role.enum';
import CreateOrderDto from 'src/dto/create-order.dto';
import {CreateGymOrderDto} from 'src/dto/create-gym-order.dto';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;
  const ApiServiceProvider = {
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
        controllers: [OrdersController],
        providers: [
          OrdersService,
          ConfigService,
          ApiServiceProvider
        ]
      })
      .compile();

    ordersController = moduleRef.get<OrdersController>(OrdersController);
    ordersService = moduleRef.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
  });

  it("calling createTraining method", () => {
    const dto = new CreateOrderDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    ordersController.createOrder(dto, req);
    expect(ordersService.createOrder).toHaveBeenCalled();
  });

  it("calling createGymOrder method", () => {
    const dto = new CreateGymOrderDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    ordersController.createGymOrder(dto, req);
    expect(ordersService.createGymOrder).toHaveBeenCalled();
  });

  it("calling getOrders method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.Coach,
      email: ''
    }};

    ordersController.getOrders(req);
    expect(ordersService.getOrders).toHaveBeenCalled();
  });

  it("calling showOrder method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.Coach,
      email: ''
    }};

    ordersController.showOrder(id, req);
    expect(ordersService.showOrder).toHaveBeenCalled();
  });

  it("calling deactivateOrder method", () => {
    const id = '';

    ordersController.deactivateOrder(id);
    expect(ordersService.deactivateOrder).toHaveBeenCalled();
  });
});
