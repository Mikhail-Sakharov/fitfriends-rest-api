import {Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';
import {SubscriptionService} from './subscription.service';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {Payload} from 'src/types/payload.interface';
import {Coach} from 'src/types/coach.interface';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {UserRole} from 'src/types/user-role.enum';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The mailing was started'
  })
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

  // ДОБАВЛЕНИЕ ТРЕНЕРА ДЛЯ ПОДПИСКИ НА НЕГО
  @EventPattern({cmd: CommandEvent.CreateCoach})
  public async createCoach(coach: Coach) {
    await this.subscriptionService.createCoach(coach);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user was subscribed/unsubscribed'
  })
  // ПОДПИСКА/ОТПИСКА НА НОВЫЕ ТРЕНИРОВКИ
  @UseGuards(AccessTokenGuard)
  @Get(':coachId')
  @HttpCode(HttpStatus.CREATED)
  public async toggleSubscriberStatus(
    @Param('coachId') coachId: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const subscriberName = req.user.userName;
    const subscriberEmail = req.user.email;
    await this.subscriptionService.toggleSubscriberStatus(coachId, {
      subscriberName,
      subscriberEmail
    });
  }
}
