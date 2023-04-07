import {Injectable} from '@nestjs/common';
import {UserRequestsRepository} from './user-requests.repository';
import {CreateUserRequestDto} from 'src/dto/create-user-request.dto';
import {UserRequestsEntity} from './user-requests.entity';

@Injectable()
export class UserRequestsService {
  constructor(
    private readonly userRequestsRepository: UserRequestsRepository
  ) {}

  public async createUserRequest(requestData: CreateUserRequestDto & {userId: string}) {
    const userRequestEntity = new UserRequestsEntity(requestData);
    const userRequest = await this.userRequestsRepository.create(userRequestEntity);
    return userRequest;
  }
}
