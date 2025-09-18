
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OrderItemResponseDto } from 'src/orderItem/dto/orderItem.response-dto';
import { ProductResponseDto } from 'src/product/dto/product.response-dto';

export class OrderResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ type: () => ProductResponseDto })
  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  totalAmount: number;

  @ApiProperty({ type: [OrderItemResponseDto] })
  @Expose()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
