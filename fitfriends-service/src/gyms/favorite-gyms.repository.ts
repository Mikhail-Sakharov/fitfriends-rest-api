import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {FavoriteGym} from 'src/types/favorite-gym.interface';
import {FavoriteGymsEntity} from './favorite-gyms.entity';
import {FavoriteGymsModel} from './favorite-gyms.model';

export class FavoriteGymsRepository implements CRUDRepository<FavoriteGymsEntity, string, FavoriteGym> {
  constructor(
    @InjectModel(FavoriteGymsModel.name) private readonly favoriteGymModel: Model<FavoriteGymsModel>
  ) {}

  public async create(item: FavoriteGymsEntity): Promise<FavoriteGym> {
    const newFavoriteGym = await this.favoriteGymModel.create(item.toObject());
    return newFavoriteGym.populate('gymId');
  }

  public async find(userId: string): Promise<FavoriteGym[]> {
    return await this.favoriteGymModel.find({userId}).populate('gymId');
  }

  public async findById(id: string): Promise<FavoriteGym | null> {
    return await this.favoriteGymModel.findById(id);
  }

  public async update(id: string, item: FavoriteGymsEntity): Promise<FavoriteGym> {
    return await this.favoriteGymModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return await this.favoriteGymModel.findByIdAndDelete(id);
  }
}
