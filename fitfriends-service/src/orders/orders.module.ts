import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';
import {OrderModel, OrderSchema} from './order.model';
import {OrdersController} from './orders.controller';
import {OrdersRepository} from './orders.repository';
import {OrdersService} from './orders.service';
import {GymMembershipRepository} from './gym-membership.repository';
import {GymMembershipModel, GymMembershipSchema} from './gym-membership.model';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: OrderModel.name, schema: OrderSchema},
      {name: GymMembershipModel.name, schema: GymMembershipSchema}
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, GymMembershipRepository, AccessTokenStrategy],
  exports: [OrdersService]
})
export class OrdersModule {}
