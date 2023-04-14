import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {UsersRepository} from './users.repository';

describe('UsersService', () => {
  let usersService: UsersService;
  const ApiRepositoryProvider = {
    provide: UsersRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findFriends: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [
          UsersRepository,
          UsersService,
          ApiRepositoryProvider,
          {
            provide: RABBITMQ_SERVICE,
            useValue: {
              getResult: jest.fn(),
            },
          }
        ]
      })
      .compile();

      usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
});
