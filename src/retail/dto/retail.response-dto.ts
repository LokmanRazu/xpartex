// retail.response-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { ProductResponseDto } from '../../product/dto/product.response-dto';
import { ProductSizeResponseDto } from '../../wholesale/dto/wholesale.response-dto';

export class RetailResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ example: 'L', type: ProductSizeResponseDto, required: false })
  @Type(() => ProductSizeResponseDto)
  @Expose()
  size?: ProductSizeResponseDto[];

  @ApiProperty({ type: () => ProductResponseDto })
  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;


  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
