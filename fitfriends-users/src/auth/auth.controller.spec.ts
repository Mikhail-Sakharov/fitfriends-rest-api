import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import CreateUserDto from 'src/dto/create-user.dto';
import LoginUserDto from 'src/dto/login-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const ApiServiceProvider = {
    provide: AuthService,
    useFactory: () => ({
      register: jest.fn(),
      loginUser: jest.fn(),
      getTokens: jest.fn(),
      updateRefreshToken: jest.fn(),
      refreshTokens: jest.fn(),
      logout: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
          AuthService,
          ApiServiceProvider
        ]
      })
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(AuthController).toBeDefined();
  });

  it("calling create method", () => {
    const dto = new CreateUserDto();
    const req = {headers: {
      authorization: ''
    }};

    authController.create(dto, req);
    expect(authService.register).toHaveBeenCalled();
  })

  it("calling loginUser method", () => {
    const dto = new LoginUserDto();
    const req = {headers: {
      authorization: ''
    }};

    authController.loginUser(dto, req);
    expect(authService.loginUser).toHaveBeenCalled();
  })

  it("calling logout method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: '',
      email: ''
    }};

    authController.logout(req);
    expect(authService.logout).toHaveBeenCalled();
  })

  it("calling refreshTokens method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: '',
      email: '',
      refreshToken: ''
    }};

    authController.refreshTokens(req);
    expect(authService.refreshTokens).toHaveBeenCalled();
  })
});
