import {Test, TestingModule} from '@nestjs/testing';
import {UserRequestsController} from './user-requests.controller';

describe('UserRequestsController', () => {
  let controller: UserRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRequestsController],
    }).compile();

    controller = module.get<UserRequestsController>(UserRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
