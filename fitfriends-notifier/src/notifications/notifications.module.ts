import {Module} from '@nestjs/common';
import {NotificationsController} from './notifications.controller';
import {NotificationsService} from './notifications.service';
import {MongooseModule} from '@nestjs/mongoose';
import {NotificationsModel, NotificationsSchema} from './notifications.model';
import {NotificationsRepository} from './notifications.repository';
import {JwtModule} from '@nestjs/jwt';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: NotificationsModel.name, schema: NotificationsSchema}
    ])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository, AccessTokenStrategy]
})
export class NotificationsModule {}
