import {Test, TestingModule} from '@nestjs/testing';
import {UserRole} from 'src/types/user-role.enum';
import {TrainingsDiaryService} from './trainings-diary.service';
import {TrainingsDiaryController} from './trainings-diary.controller';
import {CreateTrainingsDiaryDto} from 'src/dto/create-trainings-diary.dto';

describe('TrainingsDiaryController', () => {
  let trainingsDiaryController: TrainingsDiaryController;
  let trainingsDiaryService: TrainingsDiaryService;
  const ApiServiceProvider = {
    provide: TrainingsDiaryService,
    useFactory: () => ({
      createTrainingsDiary: jest.fn(),
      getTrainingsDiaries: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [TrainingsDiaryController],
        providers: [
          TrainingsDiaryService,
          ApiServiceProvider
        ]
      })
      .compile();

    trainingsDiaryController = moduleRef.get<TrainingsDiaryController>(TrainingsDiaryController);
    trainingsDiaryService = moduleRef.get<TrainingsDiaryService>(TrainingsDiaryService);
  });

  it('should be defined', () => {
    expect(trainingsDiaryController).toBeDefined();
  });

  it("calling createTrainingsDiary method", () => {
    const dto = new CreateTrainingsDiaryDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    trainingsDiaryController.createTrainingsDiary(dto, req);
    expect(trainingsDiaryService.createTrainingsDiary).toHaveBeenCalled();
  });

  it("calling getTrainingsDiaries method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    trainingsDiaryController.getTrainingsDiaries(req);
    expect(trainingsDiaryService.getTrainingsDiaries).toHaveBeenCalled();
  });
});
