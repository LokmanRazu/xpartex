import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dto/user.response-dto';
import { RfqResponseDto } from '../../rfq/dto/rfq.response-dto';
import { BidStatus } from '../bidOffer.entity';


export class BidOfferResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'RFQ details' })
  @Type(() => RfqResponseDto)
  @Expose()
  rfq: RfqResponseDto;

  @ApiProperty({ description: 'Seller details' })
  @Type(() => UserResponseDto)
  @Expose()
  seller: UserResponseDto;

  @ApiProperty({ example: 10 })
  @Expose()
  quantity: number;

  @ApiProperty({ example: 1500.5 })
  @Expose()
  price: number;

  @ApiProperty({ example: '3-5 business days', required: false })
  @Expose()
  deliveryTime?: string;

  @ApiProperty({ example: BidStatus.PENDING, enum: BidStatus })
  @Expose()
  status: BidStatus;

  @ApiProperty({ example: 0 })
  @Expose()
  updateCount: number;

  @ApiProperty({ example: '2025-09-25T10:00:00.000Z' })
  @Expose()
  createdAt: Date;
}
