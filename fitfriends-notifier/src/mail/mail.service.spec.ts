import {Test, TestingModule} from '@nestjs/testing';
import {MailService} from './mail.service';
import {MailerService} from '@nestjs-modules/mailer';
import {MAIL_QUEUE} from 'src/app.constant';
import {BullModule} from '@nestjs/bull';

describe('MailService', () => {
  let mailService: MailService;
  const ApiMailerServiceProvider = {
    provide: MailerService,
    useFactory: () => ({
      sendMail: jest.fn(),
      addTransporter: jest.fn()
    })
  };

  beforeEach(async () => {
    const reviewsModule: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: MAIL_QUEUE
        })
      ],
      providers: [
        MailService,
        MailerService,
        ApiMailerServiceProvider
      ]
    }).compile();

    mailService = reviewsModule.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });
});
