import {Entity} from 'src/types/entity.interface';
import {Order, OrderType, PaymentMethod} from 'src/types/order.interface';
import {Training} from 'src/types/training.interface';

export class OrderEntity implements Order, Entity<Order> {
  public _id?: string;
  public createdAt?: string;
  public orderType: OrderType;
  public trainingId: Training;
  public price: number;
  public quantity: number;
  public totalOrderPrice: number;
  public paymentMethod: PaymentMethod;
  public coachId: string;
  public traineeId: string;
  public isCompleted?: boolean;

  constructor(order: Order) {
    this.fillEntity(order);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(order: Order) {
    this._id = order._id;
    this.createdAt = order.createdAt;
    this.orderType = order.orderType;
    this.trainingId = order.trainingId;
    this.price = order.price;
    this.quantity = order.quantity;
    this.totalOrderPrice = order.totalOrderPrice;
    this.paymentMethod = order.paymentMethod;
    this.coachId = order.coachId;
    this.traineeId = order.traineeId;
    this.isCompleted = order.isCompleted;
  }
}
