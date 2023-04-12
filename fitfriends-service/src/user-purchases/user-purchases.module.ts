import { Module } from '@nestjs/common';
import { UserPurchasesController } from './user-purchases.controller';
import { UserPurchasesService } from './user-purchases.service';

@Module({
  controllers: [UserPurchasesController],
  providers: [UserPurchasesService]
})
export class UserPurchasesModule {}
