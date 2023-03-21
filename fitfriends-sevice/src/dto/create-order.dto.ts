import {IsEnum, IsMongoId, IsNumber} from 'class-validator';
import {OrderType, PaymentMethod} from 'src/types/order.interface';

export default class CreateOrderDto {
  @IsEnum(OrderType)
  public orderType: OrderType;

  @IsMongoId()
  public trainingId: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public quantity: number;

  @IsNumber()
  public totalOrderPrice: number;

  @IsEnum(PaymentMethod)
  public paymentMethod: PaymentMethod;

  @IsMongoId()
  public coachId: string;

  @IsMongoId()
  public traineeId: string;
}
