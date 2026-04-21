import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders') // This sets the base route to /orders
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post() // This handles POST requests to /orders
  create(@Body() orderDto: any) {
    // This calls the method you just wrote in the service
    return this.ordersService.createOrder(orderDto);
  }
}