import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {OrderModel, OrderSchema} from './order.model';
import {OrdersController} from './orders.controller';
import {OrdersRepository} from './orders.repository';
import {OrdersService} from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: OrderModel.name, schema: OrderSchema}
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository]
})
export class OrdersModule {}
