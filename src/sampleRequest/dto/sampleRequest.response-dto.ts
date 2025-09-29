import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from '../../product/dto/product.response-dto';
import { UserResponseDto } from '../../user/dto/user.response-dto';

export class SampleRequestResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique Sample Request ID (UUID)',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Red',
    description: 'Preferred color of the requested sample (optional)',
    required: false,
  })
  @Expose()
  color?: string;

  @ApiProperty({
    example: 10,
    description: 'Requested quantity of the sample product',
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    example: 50,
    description: 'Price of the requested sample (per unit or total)',
  })
  @Expose()
  price: number;

  @ApiProperty({
    example: '123 Main Street, Dhaka, Bangladesh',
    description: 'Shipping address where the sample should be delivered',
  })
  @Expose()
  shippingAddress: string;

  @ApiProperty({ description: 'The buyer requesting the sample' })
  @Type(() => UserResponseDto)
  @Expose()
  buyer: UserResponseDto;

  @ApiProperty({ description: 'The product for which the sample is requested' })
  @Type(() => ProductResponseDto)
  @Expose()
  product: ProductResponseDto;

  @ApiProperty({
    example: '2025-09-12T10:00:00.000Z',
    description: 'Sample request creation timestamp',
    type: String,
    format: 'date-time',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: '2025-09-12T12:30:00.000Z',
    description: 'Sample request last update timestamp',
    type: String,
    format: 'date-time',
  })
  @Expose()
  updatedAt: Date;
}
