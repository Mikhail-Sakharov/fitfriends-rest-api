import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId, IsNumber, IsEnum} from 'class-validator';
import {PaymentMethod} from 'src/types/order.interface';

export class CreateGymOrderDto {
  @ApiProperty({
    description: 'The Mongo ID of the respective gym in the DB',
    example: '64174be02541b3f1599b4cc2'
  })
  @IsMongoId()
  public gymId: string;

  @ApiProperty({
    description: 'The price of the selected gym membership',
    example: 2000
  })
  @IsNumber()
  public price: number;

  @ApiProperty({
    description: 'The number of the selected gym subscriptions for the membership',
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
    description: 'The unique MongoDB ID of the trainee',
    example: '6410a7b666d4c557792f0382'
  })
  @IsMongoId()
  public traineeId: string;
}
