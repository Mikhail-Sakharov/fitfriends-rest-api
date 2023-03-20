import {Injectable} from '@nestjs/common';
import CreateOrderDto from 'src/dto/create-order.dto';
import {OrderEntity} from './order.entity';
import {OrdersRepository} from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository
  ) {}

  public async createOrder(dto: CreateOrderDto) {
    const orderEntity = new OrderEntity(dto);
    const order = await this.ordersRepository.create(orderEntity);
    return order;
  }

  public async getOrders() {
    const orders = await this.ordersRepository.find();
    return orders;
  }
}
