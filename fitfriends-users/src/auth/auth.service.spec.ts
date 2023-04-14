import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {Test, TestingModule} from '@nestjs/testing';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {UsersRepository} from 'src/users/users.repository';
import {UsersService} from 'src/users/users.service';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  const ApiUsersRepositoryProvider = {
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
          AuthService,
          UsersRepository,
          UsersService,
          JwtService,
          ConfigService,
          ApiUsersRepositoryProvider,
          {
            provide: RABBITMQ_SERVICE,
            useValue: {
              getResult: jest.fn(),
            },
          }
        ]
      })
      .compile();

      authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
