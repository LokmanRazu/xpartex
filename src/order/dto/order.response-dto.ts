
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OrderItemResponseDto } from '../../orderItem/dto/orderItem.response-dto';
import { ProductResponseDto } from '../../product/dto/product.response-dto';
import { UserResponseDto } from '../../user/dto/user.response-dto';

export class OrderResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: () => UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

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
