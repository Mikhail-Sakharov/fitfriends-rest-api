import {CRUDRepository} from 'src/types/crud-repository.interface';
import {GymMembershipEntity} from './gym-membership.entity';
import {GymMembership} from 'src/types/gym-membership.interface';
import {InjectModel} from '@nestjs/mongoose';
import {GymMembershipModel} from './gym-membership.model';
import {Model} from 'mongoose';

export class GymMembershipRepository implements CRUDRepository<GymMembershipEntity, string, GymMembership> {
  constructor(
    @InjectModel(GymMembershipModel.name) private readonly gymMembershipModel: Model<GymMembershipModel>
  ) {}

  public async create(item: GymMembershipEntity): Promise<GymMembership> {
    const order = await this.gymMembershipModel.create(item.toObject());
    return order.populate('gymId');
  }

  public async find(traineeId: string): Promise<GymMembership[]> {
    return await this.gymMembershipModel.find({traineeId}).populate('gymId');
  }

  public async findById(id: string): Promise<GymMembership> {
    return await this.gymMembershipModel.findById(id).populate('gymId');
  }

  public async update(id: string, item: GymMembershipEntity): Promise<GymMembership> {
    return await this.gymMembershipModel.findByIdAndUpdate(id, item.toObject(), {new: true}).populate('gymId');
  }

  public async destroy(id: string): Promise<void> {
    return await this.gymMembershipModel.findByIdAndDelete(id);
  }
}