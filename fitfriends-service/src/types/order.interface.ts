export enum OrderType {
  Subscription = 'абонемент',
  Training = 'тренировка'
}

export enum PaymentMethod {
  Visa = 'visa',
  Mir = 'mir',
  Umoney = 'umoney'
}

export interface Order {
  _id?: string;
  createdAt?: string;
  orderType: OrderType;
  trainingId: string;
  price: number;
  quantity: number;
  totalOrderPrice: number;
  paymentMethod: PaymentMethod;
  coachId: string;
  traineeId: string;
  isCompleted?: boolean;
}
