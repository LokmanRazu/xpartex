
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderItemService } from './orderItem.service';
import { CreateOrderItemDto } from './dto/orderItem.request-dto';
import { UpdateOrderItemDto } from './dto/orderItem.update-dto';
import { OrderItemResponseDto } from './dto/orderItem.response-dto';

@ApiTags('OrderItem')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  @ApiOperation({ summary: 'Get all order item records' })
  @ApiResponse({ status: 200, description: 'List of order items', type: [OrderItemResponseDto] })
  async findAll(): Promise<OrderItemResponseDto[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order item by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Order item details', type: OrderItemResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<OrderItemResponseDto> {
    return this.orderItemService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order item record' })
  @ApiBody({ type: CreateOrderItemDto })
  @ApiResponse({ status: 201, description: 'Order item created', type: OrderItemResponseDto })
  async create(@Body() dto: CreateOrderItemDto): Promise<OrderItemResponseDto> {
    return this.orderItemService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order item by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({ status: 200, description: 'Order item updated', type: OrderItemResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateOrderItemDto,
  ): Promise<OrderItemResponseDto> {
    return this.orderItemService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order item by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Order item deleted', type: OrderItemResponseDto })
  async remove(@Param('id') id: string): Promise<OrderItemResponseDto> {
    return this.orderItemService.delete(id);
  }
}
