import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from '../../product/dto/product.response-dto';
import { UserResponseDto } from '../../user/dto/user.response-dto';
import { PostBidOfferResponseDto } from '../../postBidOffer/dto/postBidOffer.response-dto';

export class OrderResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: () => ProductResponseDto })
  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

  @ApiProperty({ type: () => UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  buyer: UserResponseDto;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  totalAmount: number;

  @ApiProperty({ type: () => PostBidOfferResponseDto })
  @Expose()
  @Type(() => PostBidOfferResponseDto)
  bids: PostBidOfferResponseDto;
}