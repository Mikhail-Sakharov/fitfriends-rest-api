import {Test, TestingModule} from '@nestjs/testing';
import {UserPurchasesController} from './user-purchases.controller';
import {UserPurchasesService} from './user-purchases.service';
import {UserRole} from 'src/types/user-role.enum';

describe('UserPurchasesController', () => {
  let userPurchasesController: UserPurchasesController;
  let userPurchasesService: UserPurchasesService;
  const ApiServiceProvider = {
    provide: UserPurchasesService,
    useFactory: () => ({
      getPurchases: jest.fn(),
      getBalance: jest.fn(),
      incrementTrainingsCount: jest.fn(),
      incrementGymsCount: jest.fn(),
      decrementTrainingsCount: jest.fn(),
      decrementGymsCount: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [UserPurchasesController],
        providers: [
          UserPurchasesService,
          ApiServiceProvider
        ]
      })
      .compile();

    userPurchasesController = moduleRef.get<UserPurchasesController>(UserPurchasesController);
    userPurchasesService = moduleRef.get<UserPurchasesService>(UserPurchasesService);
  });

  it('should be defined', () => {
    expect(userPurchasesController).toBeDefined();
  }); 

  it("calling getPurchases method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userPurchasesController.getPurchases(req);
    expect(userPurchasesService.getPurchases).toHaveBeenCalled();
  });

  it("calling getBalance method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userPurchasesController.getBalance(req);
    expect(userPurchasesService.getBalance).toHaveBeenCalled();
  });

  it("calling incrementGymsCount method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userPurchasesController.incrementGymsCount(id, req);
    expect(userPurchasesService.incrementGymsCount).toHaveBeenCalled();
  });

  it("calling decrementTrainingsCount method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userPurchasesController.decrementTrainingsCount(id, req);
    expect(userPurchasesService.decrementTrainingsCount).toHaveBeenCalled();
  });
  
  it("calling decrementGymsCount method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userPurchasesController.decrementGymsCount(id, req);
    expect(userPurchasesService.decrementGymsCount).toHaveBeenCalled();
  });
});
