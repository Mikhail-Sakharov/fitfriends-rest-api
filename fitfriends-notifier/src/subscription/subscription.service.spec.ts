import {Test, TestingModule} from '@nestjs/testing';
import {SubscriptionRepository} from './subscription.repository';
import {SubscriptionService} from './subscription.service';
import {MailService} from 'src/mail/mail.service';
import {MAIL_QUEUE} from 'src/app.constant';
import {BullModule, getQueueToken} from '@nestjs/bull';
import {Queue} from 'bull';

describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService;
  let moduleRef: TestingModule;
  const exampleQueueMock = { add: jest.fn() };
  const ApiMailServiceProvider = {
    provide: MailService,
    useFactory: () => ({
      sendAddSubscriberMail: jest.fn(),
      sendRemoveSubscriberMail: jest.fn(),
      addNewTrainingMailSendTask: jest.fn()
    })
  };
  const ApiSubscriptionRepositoryProvider = {
    provide: SubscriptionRepository,
    useFactory: () => ({
      create: jest.fn(),
      findByCoachId: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    moduleRef = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: MAIL_QUEUE
        })
      ],
      providers: [
        MailService,
        SubscriptionService,
        SubscriptionRepository,
        ApiMailServiceProvider,
        ApiSubscriptionRepositoryProvider
      ],
    })
    .overrideProvider(getQueueToken(MAIL_QUEUE))
    .useValue(exampleQueueMock)
    .compile();

    subscriptionService = moduleRef.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(subscriptionService).toBeDefined();
  });

  it("should inject the queue", () => {
    const queue = moduleRef.get<Queue>(getQueueToken(MAIL_QUEUE));
    expect(queue).toBeDefined();
  });
});
