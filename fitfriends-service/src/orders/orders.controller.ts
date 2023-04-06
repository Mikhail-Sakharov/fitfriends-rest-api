import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import CreateOrderDto from 'src/dto/create-order.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {OrderRdo} from 'src/rdo/order.rdo';
import {Payload} from 'src/types/payload.interface';
import {OrdersService} from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'The order was created'
  })
  // СОЗДАНИЕ ЗАКАЗА
  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createOrder(
    @Body() dto: CreateOrderDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const traineeId = req.user.sub;
    const order = await this.ordersService.createOrder({...dto, traineeId});
    return fillObject(OrderRdo, order);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The list of orders was received'
  })
  // ПОЛУЧЕНИЕ СПИСКА ЗАКАЗОВ
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getOrders(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
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
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async showOrder(
    @Param('id') id: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
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
  @Get('deactivate/:id')
  @HttpCode(HttpStatus.OK)
  public async deactivateOrder(
    @Param('id') id: string
  ) {
    const order = await this.ordersService.deactivateOrder(id);
    return fillObject(OrderRdo, order);
  }
}
