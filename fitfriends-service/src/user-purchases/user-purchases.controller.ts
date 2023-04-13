import {Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {UserPurchasesService} from './user-purchases.service';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {Payload} from 'src/types/payload.interface';
import {UserRole} from 'src/types/user-role.enum';
import {ApiResponse} from '@nestjs/swagger';

@Controller('purchases')
export class UserPurchasesController {
  constructor(
    private readonly userPurchasesService: UserPurchasesService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of user purchases was received'
  })
  // ЗАПРОС СПИСКА ПОКУПОК (тренировки и абонемненты)
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getPurchases(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const traineeId = req.user.sub;
    const purchases = await this.userPurchasesService.getPurchases(traineeId);
    return purchases;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user balance was received'
  })
  // БАЛАНС ПОЛЬЗОВАТЕЛЯ
  @UseGuards(AccessTokenGuard)
  @Get('balance')
  @HttpCode(HttpStatus.OK)
  public async getBalance(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const traineeId = req.user.sub;
    const balance = await this.userPurchasesService.getBalance(traineeId);
    return balance;
  }

  // ИНКРЕМЕНТ КОЛИЧЕСТВА В ЗАКАЗЕ НА ТРЕНИРОВКУ (для перерасчёта баланса)
  @UseGuards(AccessTokenGuard)
  @Get('trainings/increment:trainingId')
  @HttpCode(HttpStatus.OK)
  public async incrementTrainingsCount(
    @Param('trainingId') trainingId: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const traineeId = req.user.sub;
    await this.userPurchasesService.incrementTrainingsCount(trainingId, traineeId);
  }

  // ИНКРЕМЕНТ КОЛИЧЕСТВА В ЗАКАЗЕ НА АБОНЕМЕНТ В ЗАЛ (для перерасчёта баланса)
  @UseGuards(AccessTokenGuard)
  @Get('gyms/increment:gymId')
  @HttpCode(HttpStatus.OK)
  public async incrementGymsCount(
    @Param('gymId') gymId: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const traineeId = req.user.sub;
    await this.userPurchasesService.incrementGymsCount(gymId, traineeId);
  }

  // ДЕКРЕМЕНТ КОЛИЧЕСТВА В ЗАКАЗЕ НА ТРЕНИРОВКУ (для перерасчёта баланса)
  @UseGuards(AccessTokenGuard)
  @Get('trainings/decrement:trainingId')
  @HttpCode(HttpStatus.OK)
  public async decrementTrainingsCount(
    @Param('trainingId') trainingId: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const traineeId = req.user.sub;
    await this.userPurchasesService.decrementTrainingsCount(trainingId, traineeId);
  }

  // ДЕКРЕМЕНТ КОЛИЧЕСТВА В ЗАКАЗЕ НА АБОНЕМЕНТ В ЗАЛ (для перерасчёта баланса)
  @UseGuards(AccessTokenGuard)
  @Get('gyms/decrement:gymId')
  @HttpCode(HttpStatus.OK)
  public async decrementGymsCount(
    @Param('gymId') gymId: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const traineeId = req.user.sub;
    await this.userPurchasesService.decrementGymsCount(gymId, traineeId);
  }
}
