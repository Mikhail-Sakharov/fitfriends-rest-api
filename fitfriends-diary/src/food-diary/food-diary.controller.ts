import {Body, Controller, HttpCode, HttpStatus, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import {CreateFoodDiaryDto} from 'src/dto/create-food-diary.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {FoodDiaryRdo} from 'src/rdo/food-diary.rdo';
import {Payload} from 'src/types/payload.interface';
import {FoodDiaryService} from './food-diary.service';

@Controller('food-diary')
export class FoodDiaryController {
  constructor(
    private readonly foodDiaryService: FoodDiaryService
  ) {}

  @ApiResponse({
    type: FoodDiaryRdo,
    status: HttpStatus.CREATED,
    description: 'The food diary was created'
  })
  // СОЗДАНИЕ ДНЕВНИКА ПИТАНИЯ
  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createFoodDiary(
    @Body() dto: CreateFoodDiaryDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const foodDiary = await this.foodDiaryService.createFoodDiary({...dto, userId});
    return fillObject(FoodDiaryRdo, foodDiary);
  }

  /* @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getFoodDiaries(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {

  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async showFoodDiary(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {

  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async updateFoodDiary(
    @Body() dto: UpdateFoodDiaryDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {

  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteFoodDiary(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {

  } */
}
