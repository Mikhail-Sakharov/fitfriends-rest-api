import {BadRequestException, ConflictException, ForbiddenException, Injectable} from '@nestjs/common';
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
    const currentRequestInitiatorId = requestData.initiatorId;
    const currentRequestAddresseeId = requestData.userId;

    const allOutgoingRequests = await this.getOutgoingRequests(currentRequestInitiatorId);
    const allIncomingRequests = await this.getIncomingRequests(currentRequestInitiatorId);

    const isAlreadyInOutgoings = allOutgoingRequests.some((request) => request.userId === currentRequestAddresseeId);
    const isAlreadyInIncomings = allIncomingRequests.some((request) => request.initiatorId === currentRequestAddresseeId);

    if (isAlreadyInOutgoings) {
      throw new ConflictException('The request of the same type is already has been sent to the user');
    }
    if (isAlreadyInIncomings) {
      throw new ConflictException('The request of the same type is already has been sent to you');
    }

    const userRequestEntity = new UserRequestsEntity(requestData);
    const userRequest = await this.userRequestsRepository.create(userRequestEntity);
    return userRequest;
  }

  public async getIncomingRequests(userId: string) {
    const userRequests = await this.userRequestsRepository.findIncoming(userId);
    return userRequests;
  }

  public async getOutgoingRequests(userId: string) {
    const userRequests = await this.userRequestsRepository.findOutgoing(userId);
    return userRequests;
  }

  public async changeUserRequestStatus(id: string, userId: string, dto: UpdateUserRequestDto) {
    const userRequest = await this.userRequestsRepository.findById(id);
    if (userId !== userRequest.userId) {
      throw new ForbiddenException('Access denied');
    }
    if (userRequest.status === dto.status) {
      throw new BadRequestException('The same status is set up');
    }
    const userRequestEntity = new UserRequestsEntity({...userRequest, ...dto});
    const updatedUserRequest = await this.userRequestsRepository.update(id, userRequestEntity);
    return updatedUserRequest;
  }

  public async deleteUserRequest(id: string, userId: string) {
    const deletedUserRequest = await this.userRequestsRepository.findById(id);
    if (deletedUserRequest.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    await this.userRequestsRepository.destroy(id);
  }
}
