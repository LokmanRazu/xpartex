// b2b.response-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { ProductResponseDto } from 'src/product/dto/product.response-dto';

export class B2bResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string[];

  @ApiProperty()
  @Expose()
  size: string;

  @ApiProperty()
  @Expose()
  moq: number;

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
