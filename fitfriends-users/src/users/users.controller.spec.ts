import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {ConfigService} from '@nestjs/config';

describe('UsersController', () => {
  let usersController: UsersController;
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
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
