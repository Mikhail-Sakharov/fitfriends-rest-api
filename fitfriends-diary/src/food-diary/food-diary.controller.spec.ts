import {Test, TestingModule} from '@nestjs/testing';
import {UserRole} from 'src/types/user-role.enum';
import {FoodDiaryController} from './food-diary.controller';
import {FoodDiaryService} from './food-diary.service';
import {CreateFoodDiaryDto} from 'src/dto/create-food-diary.dto';
import {UpdateFoodDiaryDto} from 'src/dto/update-food-diary.dto';

describe('FoodDiaryController', () => {
  let foodDiaryController: FoodDiaryController;
  let foodDiaryService: FoodDiaryService;
  const ApiServiceProvider = {
    provide: FoodDiaryService,
    useFactory: () => ({
      createFoodDiary: jest.fn(),
      getFoodDiaries: jest.fn(),
      showFoodDiary: jest.fn(),
      updateFoodDiary: jest.fn(),
      deleteFoodDiary: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [FoodDiaryController],
        providers: [
          FoodDiaryService,
          ApiServiceProvider
        ]
      })
      .compile();

    foodDiaryController = moduleRef.get<FoodDiaryController>(FoodDiaryController);
    foodDiaryService = moduleRef.get<FoodDiaryService>(FoodDiaryService);
  });

  it('should be defined', () => {
    expect(foodDiaryController).toBeDefined();
  });

  it("calling createFoodDiary method", () => {
    const dto = new CreateFoodDiaryDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    foodDiaryController.createFoodDiary(dto, req);
    expect(foodDiaryService.createFoodDiary).toHaveBeenCalled();
  });

  it("calling getFoodDiaries method", () => {
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    foodDiaryController.getFoodDiaries(req);
    expect(foodDiaryService.getFoodDiaries).toHaveBeenCalled();
  });

  it("calling showFoodDiary method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    foodDiaryController.showFoodDiary(id, req);
    expect(foodDiaryService.showFoodDiary).toHaveBeenCalled();
  });

  it("calling updateFoodDiary method", () => {
    const id = '';
    const dto = new UpdateFoodDiaryDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    foodDiaryController.updateFoodDiary(id, dto, req);
    expect(foodDiaryService.updateFoodDiary).toHaveBeenCalled();
  });

  it("calling deleteFoodDiary method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    foodDiaryController.deleteFoodDiary(id, req);
    expect(foodDiaryService.deleteFoodDiary).toHaveBeenCalled();
  });
});
