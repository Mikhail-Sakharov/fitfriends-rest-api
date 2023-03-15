import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {User} from 'src/types/user.interface';
import {UserEntity} from './user.entity';
import {UserModel} from './user.model';

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

  public async find(): Promise<User[]> {
    return this.userModel.find();
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
