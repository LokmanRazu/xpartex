// b2b.response-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductSizeResponseDto } from '../../wholesale/dto/wholesale.response-dto';

class B2bDescriptionResponseDto {
  @ApiProperty({ example: '200' })
  @Expose()
  title: string;

  @ApiProperty({ example: 'Blue color, 50 pieces' })
  @Expose()
  value: string;
}

export class B2bResponseDto {
  @ApiProperty({ example: 'd2c8a4a7-2f4e-41e7-a6f2-9876543210ab' })
  @Expose()
  id: string;

  @ApiProperty({ type: [B2bDescriptionResponseDto], required: false })
  @Expose()
  @Type(() => B2bDescriptionResponseDto)
  description?: B2bDescriptionResponseDto[];

  @ApiProperty({ example: 'L', type: ProductSizeResponseDto, required: false })
  @Type(() => ProductSizeResponseDto)
  @Expose()
  size?: ProductSizeResponseDto[];

  @ApiProperty({ example: 20 })
  @Expose()
  moq?: number;

  @ApiProperty({ example: '2025-09-22T12:34:56.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-22T12:34:56.000Z' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  @Expose()
  productId: string;
}
