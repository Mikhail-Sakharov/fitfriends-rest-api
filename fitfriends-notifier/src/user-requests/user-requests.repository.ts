import {CRUDRepository} from 'src/types/crud-repository.interface';
import {UserRequestsEntity} from './user-requests.entity';
import {UserRequest} from 'src/types/user-request.interface';
import {InjectModel} from '@nestjs/mongoose';
import {UserRequestsModel} from './user-requests.model';
import {Model} from 'mongoose';

export class UserRequestsRepository implements CRUDRepository<UserRequestsEntity, string, UserRequest> {
  constructor(
    @InjectModel(UserRequestsModel.name) private readonly userRequestsModel: Model<UserRequestsModel>
  ) {}

  public async create(item: UserRequestsEntity): Promise<UserRequest> {
    const userRequest = await this.userRequestsModel.create(item.toObject());
    return userRequest;
  }

  public async findById(id: string): Promise<UserRequest> {
    return await this.userRequestsModel.findById(id);
  }

  public async findIncoming(userId: string): Promise<UserRequest[]> {
    return await this.userRequestsModel.find({userId});
  }

  public async findOutgoing(userId: string): Promise<UserRequest[]> {
    return await this.userRequestsModel.find().where({initiatorId: userId});
  }

  public async update(id: string, item: UserRequestsEntity): Promise<UserRequest> {
    return await this.userRequestsModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return await this.userRequestsModel.findByIdAndDelete(id);
  }
}
