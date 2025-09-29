
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OrderResponseDto } from '../../order/dto/order.response-dto';
import { ProductResponseDto } from '../../product/dto/product.response-dto';
export class OrderItemResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: () => OrderResponseDto })
  @Expose()
  @Type(() => OrderResponseDto)
  oreder: OrderResponseDto;

  @ApiProperty({ type: () => ProductResponseDto })
  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

  @ApiProperty()
  @Expose()
  quantity: number;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  total: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
