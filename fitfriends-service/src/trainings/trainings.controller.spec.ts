import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {TrainingsService} from './trainings.service';
import {TrainingsController} from './trainings.controller';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {UserRole} from 'src/types/user-role.enum';

describe('TrainingsController', () => {
  let trainingsController: TrainingsController;
  let trainingsService: TrainingsService;
  const ApiServiceProvider = {
    provide: TrainingsService,
    useFactory: () => ({
      create: jest.fn(),
      getTrainingsCatalog: jest.fn(),
      findTrainings: jest.fn(),
      showTraining: jest.fn(),
      updateTraining: jest.fn(),
      calculateRating: jest.fn(),
      setVideoFilePath: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [TrainingsController],
        providers: [
          TrainingsService,
          ConfigService,
          ApiServiceProvider
        ]
      })
      .compile();

    trainingsController = moduleRef.get<TrainingsController>(TrainingsController);
    trainingsService = moduleRef.get<TrainingsService>(TrainingsService);
  });

  it('should be defined', () => {
    expect(trainingsController).toBeDefined();
  });

  it("calling createTraining method", () => {
    const dto = new CreateTrainingDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.Coach,
      email: ''
    }};

    trainingsController.createTraining(dto, req);
    expect(trainingsService.create).toHaveBeenCalled();
  });

  it("calling getTrainingsCatalog method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};
    const query = {
      minPrice: 1000
    };

    trainingsController.getTrainingsCatalog(req, query);
    expect(trainingsService.getTrainingsCatalog).toHaveBeenCalled();
  });

  it("calling getCoachTrainings method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: '',
      email: ''
    }};
    const query = {
      minPrice: 1000
    };

    trainingsController.getCoachTrainings(req, query);
    expect(trainingsService.findTrainings).toHaveBeenCalled();
  });

  it("calling showTraining method", () => {
    const id = '';

    trainingsController.showTraining(id);
    expect(trainingsService.showTraining).toHaveBeenCalled();
  });

  it("calling updateTraining method", () => {
    const id = '';
    const dto = new UpdateTrainingDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: '',
      email: ''
    }};

    trainingsController.updateTraining(id, dto, req);
    expect(trainingsService.updateTraining).toHaveBeenCalled();
  });
});
