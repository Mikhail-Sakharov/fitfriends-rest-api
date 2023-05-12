import {Test, TestingModule} from '@nestjs/testing';
import {GymsController} from './gyms.controller';
import {GymsService} from './gyms.service';
import {UserRole} from 'src/types/user-role.enum';

describe('GymsController', () => {
  let gymsController: GymsController;
  let gymsService: GymsService;
  const ApiServiceProvider = {
    provide: GymsService,
    useFactory: () => ({
      createGym: jest.fn(),
      getGyms: jest.fn(),
      getCatalog: jest.fn(),
      addGymToFavorites: jest.fn(),
      showGym: jest.fn(),
      removeGymFromFavorites: jest.fn(),
      getFavoriteGyms: jest.fn(),
      seed: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [GymsController],
        providers: [
          GymsService,
          ApiServiceProvider
        ]
      })
      .compile();

    gymsController = moduleRef.get<GymsController>(GymsController);
    gymsService = moduleRef.get<GymsService>(GymsService);
  });

  it('should be defined', () => {
    expect(gymsController).toBeDefined();
  });

  it("calling getGyms method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};
    const query = {
      minPrice: 1000
    };

    gymsController.getGyms(req, query);
    expect(gymsService.getCatalog).toHaveBeenCalled();
  });

  it("calling getFavoriteGyms method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    gymsController.getFavoriteGyms(req);
    expect(gymsService.getFavoriteGyms).toHaveBeenCalled();
  });

  it("calling showGym method", () => {
    const id = '';

    gymsController.showGym(id);
    expect(gymsService.showGym).toHaveBeenCalled();
  });

  it("calling addGymToFavorites method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    gymsController.addGymToFavorites(id, req);
    expect(gymsService.addGymToFavorites).toHaveBeenCalled();
  });

  it("calling removeGymFromFavorites method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    gymsController.removeGymFromFavorites(id, req);
    expect(gymsService.removeGymFromFavorites).toHaveBeenCalled();
  });
});
