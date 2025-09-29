
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CartResponseDto } from '../../cart/dto/cart.response-dto';
import { ProductResponseDto } from '../../product/dto/product.response-dto';

export class CartItemResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: () => ProductResponseDto })
  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

  @ApiProperty({ type: () => CartResponseDto })
  @Expose()
  @Type(() => CartResponseDto)
  cart: CartResponseDto;

  @ApiProperty()
  @Expose()
  quantity: number;

  @ApiProperty()
  @Expose()
  addedTime: Date;
}
