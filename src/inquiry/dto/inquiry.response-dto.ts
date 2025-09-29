import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../product/dto/product.response-dto';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dto/user.response-dto';

export class InquiryResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  quantity: number;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  attachment: string;

  @ApiProperty({ type: () => ProductResponseDto })
  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

  @ApiProperty({ type: () => UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  buyer: UserResponseDto;
}
