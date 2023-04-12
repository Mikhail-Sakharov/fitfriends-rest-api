import {Module} from '@nestjs/common';
import {UserPurchasesController} from './user-purchases.controller';
import {UserPurchasesService} from './user-purchases.service';
import {OrdersModule} from 'src/orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [UserPurchasesController],
  providers: [UserPurchasesService]
})
export class UserPurchasesModule {}
