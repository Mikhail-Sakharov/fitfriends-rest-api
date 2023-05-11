import {Test, TestingModule} from '@nestjs/testing';
import {UserRole} from 'src/types/user-role.enum';
import {UserRequestsController} from './user-requests.controller';
import {UserRequestsService} from './user-requests.service';
import {CreateUserRequestDto} from 'src/dto/create-user-request.dto';
import {UpdateUserRequestDto} from 'src/dto/update-user-request.dto';

describe('UserRequestsController', () => {
  let userRequestsController: UserRequestsController;
  let userRequestsService: UserRequestsService;
  const ApiServiceProvider = {
    provide: UserRequestsService,
    useFactory: () => ({
      createUserRequest: jest.fn(),
      getIncomingRequests: jest.fn(),
      getOutgoingRequests: jest.fn(),
      changeUserRequestStatus: jest.fn(),
      deleteUserRequest: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [UserRequestsController],
        providers: [
          UserRequestsService,
          ApiServiceProvider
        ]
      })
      .compile();

    userRequestsController = moduleRef.get<UserRequestsController>(UserRequestsController);
    userRequestsService = moduleRef.get<UserRequestsService>(UserRequestsService);
  });

  it('should be defined', () => {
    expect(userRequestsController).toBeDefined();
  });

  it("calling createUserRequest method", () => {
    const dto = new CreateUserRequestDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userRequestsController.createUserRequest(dto, req);
    expect(userRequestsService.createUserRequest).toHaveBeenCalled();
  });

  it("calling getIncomingRequests method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userRequestsController.getIncomingRequests(req);
    expect(userRequestsService.getIncomingRequests).toHaveBeenCalled();
  });

  it("calling getOutgoingRequests method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userRequestsController.getOutgoingRequests(req);
    expect(userRequestsService.getOutgoingRequests).toHaveBeenCalled();
  });

  it("calling changeUserRequestStatus method", () => {
    const id = '';
    const dto = new UpdateUserRequestDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: '',
      email: ''
    }};

    userRequestsController.changeUserRequestStatus(id, dto, req);
    expect(userRequestsService.changeUserRequestStatus).toHaveBeenCalled();
  });

  it("calling deleteUserRequest method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    userRequestsController.deleteUserRequest(id, req);
    expect(userRequestsService.deleteUserRequest).toHaveBeenCalled();
  });
});
