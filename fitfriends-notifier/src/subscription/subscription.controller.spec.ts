import {Test, TestingModule} from '@nestjs/testing';
import {UserRole} from 'src/types/user-role.enum';
import {SubscriptionController} from './subscription.controller';
import {SubscriptionService} from './subscription.service';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

describe('SubscriptionController', () => {
  let subscriptionController: SubscriptionController;
  let subscriptionService: SubscriptionService;
  const ApiServiceProvider = {
    provide: SubscriptionService,
    useFactory: () => ({
      createCoach: jest.fn(),
      toggleSubscriberStatus: jest.fn(),
      runAllQueuedTasks: jest.fn(),
      addNewTrainingMailSendTask: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [SubscriptionController],
        providers: [
          SubscriptionService,
          ApiServiceProvider
        ]
      })
      .compile();

    subscriptionController = moduleRef.get<SubscriptionController>(SubscriptionController);
    subscriptionService = moduleRef.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(subscriptionController).toBeDefined();
  });

  it("calling runAllQueuedTasks method", () => {
    subscriptionController.runAllQueuedTasks();
    expect(subscriptionService.runAllQueuedTasks).toHaveBeenCalled();
  });

  it("calling addNewTrainingMailSendTask method", () => {
    const trainingData = {
      coachId: '',
      coachName: '',
      trainingType: '',
      trainingTitle: '',
      trainingDescription: '',
      trainingGender: '',
      trainingLevel: '',
      trainingDuration: '',
      trainingCaloriesCount: 1000,
      trainingPrice: 2000
    };
    subscriptionController.addNewTrainingMailSendTask(trainingData);
    expect(subscriptionService.addNewTrainingMailSendTask).toHaveBeenCalled();
  });

  it("calling createCoach method", () => {
    const trainingData = {
      coachId: '',
      coachName: '',
      coachEmail: '',
      avatarUrl: '',
      gender: Gender.Undefined,
      birthday: '',
      location: SubwayStation.Petrogradskaya,
      trainingLevel: TrainingLevel.Amateur,
      trainingTypes: [TrainingType.Aerobics]
    };
    subscriptionController.createCoach(trainingData);
    expect(subscriptionService.createCoach).toHaveBeenCalled();
  });

  it("calling toggleSubscriberStatus method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    subscriptionController.toggleSubscriberStatus(id, req);
    expect(subscriptionService.toggleSubscriberStatus).toHaveBeenCalled();
  });
});
