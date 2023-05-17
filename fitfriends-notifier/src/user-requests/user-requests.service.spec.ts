import {Test, TestingModule} from '@nestjs/testing';
import {UserRequestsRepository} from './user-requests.repository';
import {UserRequestsService} from './user-requests.service';
import {RABBITMQ_SERVICE} from 'src/app.constant';

describe('UserRequestsService', () => {
  let userRequestsService: UserRequestsService;
  const ApiUserRequestsRepositoryProvider = {
    provide: UserRequestsRepository,
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
        UserRequestsService,
        UserRequestsRepository,
        ApiUserRequestsRepositoryProvider,
        {
          provide: RABBITMQ_SERVICE,
          useValue: {
            getResult: jest.fn(),
          },
        }
      ],
    }).compile();

    userRequestsService = module.get<UserRequestsService>(UserRequestsService);
  });

  it('should be defined', () => {
    expect(userRequestsService).toBeDefined();
  });
});
