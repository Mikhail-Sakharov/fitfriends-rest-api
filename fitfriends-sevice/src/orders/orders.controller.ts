import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import CreateOrderDto from 'src/dto/create-order.dto';
import {OrderRdo} from 'src/rdo/order.rdo';
import {OrdersService} from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  // СОЗДАНИЕ ЗАКАЗА
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createOrder(
    @Body() dto: CreateOrderDto
  ) {
    const order = await this.ordersService.createOrder(dto);
    return fillObject(OrderRdo, order);
  }

  // ПОЛУЧЕНИЕ СПИСКА ЗАКАЗОВ
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getOrders() {
    const orders = await this.ordersService.getOrders();
    return fillObject(OrderRdo, orders);
  }

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
