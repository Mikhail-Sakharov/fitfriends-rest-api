import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';
import {SubscriptionService} from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {}

  // ПОДПИСКА НА ТРЕНЕРА

  // ЗАПУСК РАССЫЛКИ
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async runAllQueuedTasks() {
    await this.subscriptionService.runAllQueuedTasks();
  }

  // ДОБАВЛЕНИЕ ЗАДАЧИ ОТПРАВКИ УВЕДОМЛЕНИЯ В ОЧЕРЕДЬ
  @EventPattern({cmd: CommandEvent.CreateNewTraining})
  public async addNewTrainingMailSendTask(trainingData: Omit<NewTrainingEmailData, 'sendTo' | 'suscriberName'>) {
    await this.subscriptionService.addNewTrainingMailSendTask({
      ...trainingData,
      sendTo: 'mikhail@mikhail.com',
      suscriberName: 'Mikhail'
    });
  }
}
