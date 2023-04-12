import {OrderType, PaymentMethod} from './order.interface';

export interface GymMembership {
  _id?: string;
  createdAt?: string;
  orderType?: OrderType;
  gymId: string;
  price: number;
  quantity: number;
  totalOrderPrice: number;
  paymentMethod: PaymentMethod;
  traineeId: string;
  isCompleted?: boolean;
}
