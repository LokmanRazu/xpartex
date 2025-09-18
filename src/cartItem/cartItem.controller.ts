
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CartItemService } from './cartItem.service';
import { CreateCartItemDto } from './dto/cartItem.request-dto';
import { UpdateCartItemDto } from './dto/cartItem.update-dto';
import { CartItemResponseDto } from './dto/cartItem.response-dto';

@ApiTags('CartItem')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cart item records' })
  @ApiResponse({ status: 200, description: 'List of cart items', type: [CartItemResponseDto] })
  async findAll(): Promise<CartItemResponseDto[]> {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cart item by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Cart item details', type: CartItemResponseDto })
  async findOne(@Param('id') id: string): Promise<CartItemResponseDto> {
    return this.cartItemService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new cart item record' })
  @ApiBody({ type: CreateCartItemDto })
  @ApiResponse({ status: 201, description: 'Cart item created', type: CartItemResponseDto })
  async create(@Body() dto: CreateCartItemDto): Promise<CartItemResponseDto> {
    return this.cartItemService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cart item by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateCartItemDto })
  @ApiResponse({ status: 200, description: 'Cart item updated', type: CartItemResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCartItemDto,
  ): Promise<CartItemResponseDto> {
    return this.cartItemService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cart item by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Cart item deleted', type: CartItemResponseDto })
  async remove(@Param('id') id: string): Promise<CartItemResponseDto> {
    return this.cartItemService.delete(id);
  }
}
