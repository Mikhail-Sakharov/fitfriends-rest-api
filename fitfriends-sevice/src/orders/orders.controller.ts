import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import CreateOrderDto from 'src/dto/create-order.dto';
import {OrderRdo} from 'src/rdo/order.rdo';
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
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createOrder(
    @Body() dto: CreateOrderDto
  ) {
    const order = await this.ordersService.createOrder(dto);
    return fillObject(OrderRdo, order);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The list of orders was received'
  })
  // ПОЛУЧЕНИЕ СПИСКА ЗАКАЗОВ
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getOrders() {
    const orders = await this.ordersService.getOrders();
    return fillObject(OrderRdo, orders);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The detailed information about the order was received'
  })
  // ДЕТАЛЬНАЯ ИНФОРМАЦИЯ ПО ЗАКАЗУ
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async showOrder(
    @Param('id') id: string
  ) {
    // Добавить сбор статистики:
    // ----- price, totalOrderPrice (--> RDO)
    // ----- totalTrainingQuantity, totalTrainingAmountOfMoney (--> RDO)
    const order = await this.ordersService.showOrder(id);
    return fillObject(OrderRdo, order);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The order was deactivated'
  })
  // ДЕАКТИВАЦИЯ ЗАКАЗА
  @Get('deactivate/:id')
  @HttpCode(HttpStatus.OK)
  public async deactivateOrder(
    @Param('id') id: string
  ) {
    const order = await this.ordersService.deactivateOrder(id);
    return fillObject(OrderRdo, order);
  }
}
