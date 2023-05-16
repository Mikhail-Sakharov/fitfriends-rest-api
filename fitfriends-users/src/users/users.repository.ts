import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {User} from 'src/types/user.interface';
import {UserEntity} from './user.entity';
import {UserModel} from './user.model';
import {GetUsersQuery} from 'src/query/get-users.query';
import {SortOrder, SortOrderMap, SortType} from 'src/types/sort.types';
import {RESPONSE_ENTITIES_MAX_COUNT} from 'src/app.constant';

@Injectable()
export class UsersRepository
  implements CRUDRepository<UserEntity, string, User>
{
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async find(query?: GetUsersQuery): Promise<User[]> {
    const {
      location,
      trainingTypes,
      trainingLevel,
      userRole,
      sortType = SortType.Date,
      sortOrder = SortOrder.Down,
      page = 1,
      limit
    } = query;

    return this.userModel
      .find()
      .where(location ? {location: {$in: location.split(',')}} : {})
      .where(trainingTypes ? {trainingTypes: {$in: trainingTypes.split(',')}} : {})
      .where(trainingLevel ? {trainingLevel: {$in: trainingLevel.split(',')}} : {})
      .where(userRole ? {userRole: {$in: userRole.split(',')}} : {})
      .sort({[sortType]: SortOrderMap[sortOrder]})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit ?? RESPONSE_ENTITIES_MAX_COUNT);
  }

  public async findFriends(id: string): Promise<User[]> {
    const user = await this.findById(id);
    const friendsIds = user.myFriends;
    return this.userModel.find({_id: {$in: friendsIds }});
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({email});
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return this.userModel.findByIdAndDelete(id);
  }
}
