import {Controller, Get, HttpCode, HttpStatus, Param, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';
import {SubscriptionService} from './subscription.service';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {Payload} from 'src/types/payload.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {}

  // ЗАПУСК РАССЫЛКИ
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async runAllQueuedTasks() {
    await this.subscriptionService.runAllQueuedTasks();
  }

  // ДОБАВЛЕНИЕ ЗАДАЧИ ОТПРАВКИ УВЕДОМЛЕНИЯ В ОЧЕРЕДЬ
  @EventPattern({cmd: CommandEvent.CreateNewTraining})
  public async addNewTrainingMailSendTask(trainingData: Omit<NewTrainingEmailData, 'sendTo' | 'subscriberName'>) {
    await this.subscriptionService.addNewTrainingMailSendTask(trainingData);
  }

  // ПОДПИСКА/ОТПИСКА НА НОВЫЕ ТРЕНИРОВКИ
  @UseGuards(AccessTokenGuard)
  @Get(':coachId')
  @HttpCode(HttpStatus.CREATED)
  public async toggleSubscriberStatus(
    @Param('coachId') coachId: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const subscriberName = req.user.userName;
    const subscriberEmail = req.user.email;
    await this.subscriptionService.toggleSubscriberStatus(coachId, {
      subscriberName,
      subscriberEmail
    });
  }
}
