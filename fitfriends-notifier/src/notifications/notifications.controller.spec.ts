import {Test, TestingModule} from '@nestjs/testing';
import {UserRole} from 'src/types/user-role.enum';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {NotificationsController} from './notifications.controller';
import {NotificationsService} from './notifications.service';
import {NotificationDto} from 'src/dto/notification.dto';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;
  let notificationsService: NotificationsService;
  const ApiServiceProvider = {
    provide: NotificationsService,
    useFactory: () => ({
      createNotification: jest.fn(),
      getNotifications: jest.fn(),
      deleteNotification: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [NotificationsController],
        providers: [
          NotificationsService,
          ApiServiceProvider
        ]
      })
      .compile();

    notificationsController = moduleRef.get<NotificationsController>(NotificationsController);
    notificationsService = moduleRef.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(notificationsController).toBeDefined();
  });

  it("calling createAddFriendNotification method", () => {
    const notificationData = new NotificationDto();
    notificationsController.createAddFriendNotification(notificationData);
    expect(notificationsService.createNotification).toHaveBeenCalled();
  });

  it("calling createRemoveFriendNotification method", () => {
    const notificationData = new NotificationDto();
    notificationsController.createRemoveFriendNotification(notificationData);
    expect(notificationsService.createNotification).toHaveBeenCalled();
  });

  it("calling createTrainingRequestNotification method", () => {
    const notificationData = new NotificationDto();
    notificationsController.createTrainingRequestNotification(notificationData);
    expect(notificationsService.createNotification).toHaveBeenCalled();
  });

  it("calling createTrainingRequestAcceptionNotification method", () => {
    const notificationData = new NotificationDto();
    notificationsController.createTrainingRequestAcceptionNotification(notificationData);
    expect(notificationsService.createNotification).toHaveBeenCalled();
  });

  it("calling createTrainingRequestRejectionNotification method", () => {
    const notificationData = new NotificationDto();
    notificationsController.createTrainingRequestRejectionNotification(notificationData);
    expect(notificationsService.createNotification).toHaveBeenCalled();
  });

  it("calling getNotifications method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    notificationsController.getNotifications(req);
    expect(notificationsService.getNotifications).toHaveBeenCalled();
  });

  it("calling deleteNotification method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    notificationsController.deleteNotification(id, req);
    expect(notificationsService.deleteNotification).toHaveBeenCalled();
  });
});
