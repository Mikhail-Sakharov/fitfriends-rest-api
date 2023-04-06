import {Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Patch, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import {CreateFoodDiaryDto} from 'src/dto/create-food-diary.dto';
import {UpdateFoodDiaryDto} from 'src/dto/update-food-diary.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {FoodDiaryRdo} from 'src/rdo/food-diary.rdo';
import {Payload} from 'src/types/payload.interface';
import {UserRole} from 'src/types/user-role.enum';
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
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    const foodDiary = await this.foodDiaryService.createFoodDiary({...dto, userId});
    return fillObject(FoodDiaryRdo, foodDiary);
  }

  @ApiResponse({
    type: FoodDiaryRdo,
    status: HttpStatus.OK,
    description: 'The food diary list was received'
  })
  // ПОЛУЧЕНИЕ СПИСКА ДНЕВНИКОВ ПИТАНИЯ
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getFoodDiaries(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    const foodDiaries = await this.foodDiaryService.getFoodDiaries(userId);
    return fillObject(FoodDiaryRdo, foodDiaries);
  }

  @ApiResponse({
    type: FoodDiaryRdo,
    status: HttpStatus.OK,
    description: 'The food diary info was received'
  })
  // ПОЛУЧЕНИЕ ДЕТАЛЬНОЙ ИНФОРМАЦИИ О ДНЕВНИКЕ ПИТАНИЯ
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async showFoodDiary(
    @Param('id') id: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    const foodDiary = await this.foodDiaryService.showFoodDiary(id, userId);
    return fillObject(FoodDiaryRdo, foodDiary);
  }

  @ApiResponse({
    type: FoodDiaryRdo,
    status: HttpStatus.OK,
    description: 'The food diary was updated'
  })
  // ВНЕСЕНИЕ ИЗМЕНЕНИЙ В ДНЕВНИК ПИТАНИЯ
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async updateFoodDiary(
    @Param('id') id: string,
    @Body() dto: UpdateFoodDiaryDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    const updatedFoodDiary = await this.foodDiaryService.updateFoodDiary(id, userId, dto);
    return fillObject(FoodDiaryRdo, updatedFoodDiary);
  }

  @ApiResponse({
    type: FoodDiaryRdo,
    status: HttpStatus.OK,
    description: 'The food diary was deleted'
  })
  // УДАЛЕНИЕ ДНЕВНИКА ПИТАНИЯ
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteFoodDiary(
    @Param('id') id: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    return await this.foodDiaryService.deleteFoodDiary(id, userId);
  }
}
