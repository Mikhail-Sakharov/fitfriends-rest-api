import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import CreateOrderDto from 'src/dto/create-order.dto';
import {OrdersService} from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createOrder(
    @Body() dto: CreateOrderDto
  ) {
    const order = await this.ordersService.createOrder(dto);
    return order;
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getOrders() {
    const orders = await this.ordersService.getOrders();
    return orders;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async showOrder(
    @Param('id') id: string
  ) {
    const order = await this.ordersService.showOrder(id);
    return order;
  }

  @Get('deactivate/:id')
  @HttpCode(HttpStatus.OK)
  public async deactivateOrder(
    @Param('id') id: string
  ) {
    const order = await this.ordersService.deactivateOrder(id);
    return order;
  }
}
