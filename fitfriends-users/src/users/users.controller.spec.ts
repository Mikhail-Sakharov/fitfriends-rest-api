import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {ConfigService} from '@nestjs/config';
import UpdateUserDto from 'src/dto/update-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  const ApiServiceProvider = {
    provide: UsersService,
    useFactory: () => ({
      getFriends: jest.fn(),
      addFriend: jest.fn(),
      removeFriend: jest.fn(),
      getUsers: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      setAvatarPath: jest.fn(),
      setCertificateFilePath: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [
          UsersService,
          ConfigService,
          ApiServiceProvider,
          {
            provide: RABBITMQ_SERVICE,
            useValue: {
              getResult: jest.fn(),
            },
          }
        ]
      })
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it("calling getFriends method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: '',
      email: ''
    }};

    usersController.getFriends(req);
    expect(usersService.getFriends).toHaveBeenCalled();
  })

  it("calling getUsers method", () => {
    const query = {
      location: ''
    };

    usersController.getUsers(query);
    expect(usersService.getUsers).toHaveBeenCalled();
  })

  it("calling updateUser method", () => {
    const dto = new UpdateUserDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: '',
      email: ''
    }};

    usersController.updateUser(dto, req);
    expect(usersService.updateUser).toHaveBeenCalled();
  })
});
