import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cart.request-dto';
import { UpdateCartDto } from './dto/cart.update-dto';
import { CartResponseDto } from './dto/cart.response-dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cart records' })
  @ApiResponse({ status: 200, description: 'List of carts', type: [CartResponseDto] })
  async findAll(): Promise<CartResponseDto[]> {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cart by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Cart details', type: CartResponseDto })
  async findOne(@Param('id') id: string): Promise<CartResponseDto> {
    return this.cartService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new cart record' })
  @ApiBody({ type: CreateCartDto })
  @ApiResponse({ status: 201, description: 'Cart created', type: CartResponseDto })
  async create(@Body() dto: CreateCartDto): Promise<CartResponseDto> {
    return this.cartService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cart by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 200, description: 'Cart updated', type: CartResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCartDto,
  ): Promise<CartResponseDto> {
    return this.cartService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cart by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Cart deleted', type: CartResponseDto })
  async remove(@Param('id') id: string): Promise<CartResponseDto> {
    return this.cartService.delete(id);
  }
}
