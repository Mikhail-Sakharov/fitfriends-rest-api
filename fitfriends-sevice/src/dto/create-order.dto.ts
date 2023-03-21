import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsMongoId, IsNumber} from 'class-validator';
import {OrderType, PaymentMethod} from 'src/types/order.interface';

export default class CreateOrderDto {
  @ApiProperty({
    description: 'The type of the order',
    example: 'тренировка'
  })
  @IsEnum(OrderType)
  public orderType: OrderType;

  @ApiProperty({
    description: 'The Mongo ID of the respective training in the DB',
    example: '64174be02541b3f1599b4cc2'
  })
  @IsMongoId()
  public trainingId: string;

  @ApiProperty({
    description: 'The price of the selected training',
    example: 2000
  })
  @IsNumber()
  public price: number;

  @ApiProperty({
    description: 'The number of the selected trainings',
    example: 2
  })
  @IsNumber()
  public quantity: number;

  @ApiProperty({
    description: 'The total price of the order',
    example: 4000
  })
  @IsNumber()
  public totalOrderPrice: number;

  @ApiProperty({
    description: 'The payment methode a user selected',
    example: 'visa'
  })
  @IsEnum(PaymentMethod)
  public paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'The unique MongoDB ID of the coach',
    example: '6410a7b666d4c557792f0382'
  })
  @IsMongoId()
  public coachId: string;

  @ApiProperty({
    description: 'The unique MongoDB ID of the user who has made the order',
    example: '6410a7b666d4c557792f0383'
  })
  @IsMongoId()
  public traineeId: string;
}
