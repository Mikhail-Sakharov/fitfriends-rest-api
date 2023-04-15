import {Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import CreateOrderDto from 'src/dto/create-order.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {OrderRdo} from 'src/rdo/order.rdo';
import {Payload} from 'src/types/payload.interface';
import {OrdersService} from './orders.service';
import {UserRole} from 'src/types/user-role.enum';
import {CreateGymOrderDto} from 'src/dto/create-gym-order.dto';
import {GymOrderRdo} from 'src/rdo/gym-order.rdo';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'The training order was created'
  })
  // СОЗДАНИЕ ЗАКАЗА НА ТРЕНИРОВКУ
  @UseGuards(AccessTokenGuard)
  @Post('trainings')
  @HttpCode(HttpStatus.CREATED)
  public async createOrder(
    @Body() dto: CreateOrderDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const traineeId = req.user.sub;
    const order = await this.ordersService.createOrder({...dto, traineeId});
    return fillObject(OrderRdo, order);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'The gym membership order was created'
  })
  // СОЗДАНИЕ ЗАКАЗА НА АБОНЕМЕНТ В ЗАЛ
  @UseGuards(AccessTokenGuard)
  @Post('gyms')
  @HttpCode(HttpStatus.CREATED)
  public async createGymOrder(
    @Body() dto: CreateGymOrderDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const traineeId = req.user.sub;
    const order = await this.ordersService.createGymOrder({...dto, traineeId});
    return fillObject(GymOrderRdo, order);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The list of orders was received'
  })
  // ПОЛУЧЕНИЕ СПИСКА ЗАКАЗОВ НА ТРЕНИРОВКУ
  @UseGuards(AccessTokenGuard)
  @Get('trainings')
  @HttpCode(HttpStatus.OK)
  public async getOrders(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.Coach) {
      throw new ForbiddenException('Only for Coach');
    }
    // Клиент может применить сортировку для списка заказов:
    // - количество купленных тренировок (возрастание, убывание),
    // - заработанная сумма (возрастание, убывание)
    const coachId = req.user.sub;
    const orders = await this.ordersService.getOrders(coachId);
    const transformedOrders = (fillObject(OrderRdo, orders) as unknown) as OrderRdo[];
    const ordersWithStatistics = await this.ordersService.getOrdersWithStatistics(transformedOrders);
    return ordersWithStatistics;
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The detailed information about the order was received'
  })
  // ДЕТАЛЬНАЯ ИНФОРМАЦИЯ ПО ЗАКАЗУ
  @UseGuards(AccessTokenGuard)
  @Get('trainings/:id')
  @HttpCode(HttpStatus.OK)
  public async showOrder(
    @Param('id') id: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.Coach) {
      throw new ForbiddenException('Only for Coach');
    }
    const coachId = req.user.sub;
    const order = await this.ordersService.showOrder(id, coachId);
    return fillObject(OrderRdo, order);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The order was deactivated'
  })
  // ДЕАКТИВАЦИЯ ЗАКАЗА
  @UseGuards(AccessTokenGuard)
  @Get('deactivate/trainings/:id')
  @HttpCode(HttpStatus.OK)
  public async deactivateOrder(
    @Param('id') id: string
  ) {
    const order = await this.ordersService.deactivateOrder(id);
    return fillObject(OrderRdo, order);
  }
}
