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
    const newOrder = new this.orderModel(item);
    return newOrder.save();
  }

  public async findById(id: string): Promise<Order | null> {
    return this.orderModel.findById(id);
  }

  public async update(id: string, item: OrderEntity): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return this.orderModel.findByIdAndDelete(id);
  }
}
