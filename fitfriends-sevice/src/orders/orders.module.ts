import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';
import {OrderModel, OrderSchema} from './order.model';
import {OrdersController} from './orders.controller';
import {OrdersRepository} from './orders.repository';
import {OrdersService} from './orders.service';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: OrderModel.name, schema: OrderSchema}
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, AccessTokenStrategy]
})
export class OrdersModule {}
