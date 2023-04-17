import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {Order} from 'src/types/order.interface';
import {OrderEntity} from './order.entity';
import {OrderModel} from './order.model';
import {GetOrdersQuery} from 'src/query/get-orders.query';
import {RESPONSE_ENTITIES_MAX_COUNT} from 'src/app.constant';

@Injectable()
export class OrdersRepository implements CRUDRepository<OrderEntity, string, Order> {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>,
  ) {}

  public async create(item: OrderEntity): Promise<Order> {
    const order = await this.orderModel.create(item.toObject());
    return order.populate('trainingId');
  }

  public async find(coachId: string, query?: Omit<GetOrdersQuery, 'sortType' | 'sortOrder'>): Promise<Order[]> {
    const {
      page,
      limit
    } = query;

    return await this.orderModel
      .find({coachId})
      .populate('trainingId')
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit ?? RESPONSE_ENTITIES_MAX_COUNT);
  }

  public async getTrainingPurchases(traineeId: string): Promise<Order[]> {
    return await this.orderModel.find({traineeId}).populate('trainingId');
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
