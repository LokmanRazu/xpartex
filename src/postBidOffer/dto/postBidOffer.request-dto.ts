import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class PostBidOfferRequestDto {
  @ApiProperty({
    example: 100,
    description: 'Price of the bid',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: '2025-12-31',
    description: 'Delivery time of the bid',
  })
  @IsDateString()
  @IsNotEmpty()
  delivaryTime: Date;

  @ApiProperty({
    example: ['dhl', 'fedex'],
    description: 'Shipping methods of the bid',
  })
  @IsArray()
  @IsNotEmpty()
  shippingMetode: string[];

  @ApiProperty({
    example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab',
    description: 'Buyer post linked to this bid',
  })
  @IsUUID('4', { message: 'buyerPostId must be a valid UUID' })
  @IsNotEmpty({ message: 'buyerPostId is required' })
  buyerPostId: string;

  @ApiProperty({
    example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab',
    description: 'Bidder linked to this bid',
  })
  @IsUUID('4', { message: 'bidderId must be a valid UUID' })
  @IsNotEmpty({ message: 'bidderId is required' })
  bidderId: string;
}
