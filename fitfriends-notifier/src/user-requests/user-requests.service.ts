import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserRequestsRepository} from './user-requests.repository';
import {CreateUserRequestDto} from 'src/dto/create-user-request.dto';
import {UserRequestsEntity} from './user-requests.entity';
import {UpdateUserRequestDto} from 'src/dto/update-user-request.dto';

@Injectable()
export class UserRequestsService {
  constructor(
    private readonly userRequestsRepository: UserRequestsRepository
  ) {}

  public async createUserRequest(requestData: CreateUserRequestDto & {initiatorId: string}) {
    const userRequestEntity = new UserRequestsEntity(requestData);
    const userRequest = await this.userRequestsRepository.create(userRequestEntity);
    return userRequest;
  }

  public async getUserRequests(userId: string) {
    const userRequests = await this.userRequestsRepository.find(userId);
    return userRequests;
  }

  public async changeUserRequestStatus(id: string, userId: string, dto: UpdateUserRequestDto) {
    const userRequest = await this.userRequestsRepository.findById(id);
    if (userId !== userRequest.userId) {
      throw new ForbiddenException('Access denied');
    }
    const userRequestEntity = new UserRequestsEntity({...userRequest, ...dto});
    const updatedUserRequest = await this.userRequestsRepository.update(id, userRequestEntity);
    return updatedUserRequest;
  }
}
