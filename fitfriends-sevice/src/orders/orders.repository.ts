import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {Order} from 'src/types/order.interface';
import {OrderEntity} from './order.entity';
import {OrderModel} from './order.model';

@Injectable()
export class OrdersRepository implements CRUDRepository<OrderEntity, string, Order> {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>,
  ) {}

  public async create(item: OrderEntity): Promise<Order> {
    const order = await this.orderModel.create(item.toObject());
    return order.populate('trainingId');
  }

  public async find(): Promise<Order[]> {
    return await this.orderModel.find().populate('trainingId');
  }

  public async findById(id: string): Promise<Order | null> {
    return await this.orderModel.findById(id).populate('trainingId');
  }

  public async update(id: string, item: OrderEntity): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, item.toObject(), {new: true}).populate('trainingId');
  }

  public async destroy(id: string): Promise<void> {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
