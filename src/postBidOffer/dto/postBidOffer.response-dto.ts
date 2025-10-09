import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BuyerPostResponseDto } from '../../buyerPost/dto/buyerPost.response-dto';
import { UserResponseDto } from '../../user/dto/user.response-dto';

export class PostBidOfferResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  delivaryTime: Date;

  @ApiProperty()
  @Expose()
  shippingMetode: string[];

  @ApiPropertyOptional({ required: false, example: 'https://example.com/attachments.pdf' })
  @Expose()
  attachment: string;

  @ApiProperty({ type: () => BuyerPostResponseDto })
  @Expose()
  @Type(() => BuyerPostResponseDto)
  buyerPost: BuyerPostResponseDto;

  @ApiProperty({ type: () => UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  bidder: UserResponseDto;
}
