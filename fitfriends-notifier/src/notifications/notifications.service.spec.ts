import {Test, TestingModule} from '@nestjs/testing';
import {NotificationsRepository} from './notifications.repository';
import {NotificationsService} from './notifications.service';

describe('NotificationsService', () => {
  let notificationsService: NotificationsService;
  const ApiNotificationsRepositoryProvider = {
    provide: NotificationsRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        NotificationsRepository,
        ApiNotificationsRepositoryProvider
      ],
    }).compile();

    notificationsService = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(notificationsService).toBeDefined();
  });
});
