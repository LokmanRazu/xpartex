import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { BidStatus } from '../bidOffer.entity';

export class CreateBidDto {
    @ApiProperty({ example: 'rfq-uuid', description: 'RFQ ID (UUID)' })
    @IsString()
    @IsNotEmpty()
    rfqId: string;

    @ApiProperty({ example: 'seller-uuid', description: 'Seller ID (UUID)' })
    @IsString()
    @IsNotEmpty()
    sellerId: string;

    @ApiProperty({ example: '10', description: 'Quantity must be a number' })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ example: 1500.5, description: 'Bid price' })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: '3-5 business days', description: 'Delivery time', required: false })
    @IsString()
    @IsOptional()
    deliveryTime?: string;

    @ApiProperty({ example: BidStatus.PENDING, enum: BidStatus, description: 'Bid status', required: true, default: BidStatus.OPEN })
    @IsEnum(BidStatus)
    @IsNotEmpty()
    status?: BidStatus;

    @ApiProperty({ example: 0, description: 'Number of times the bid has been updated', required: false })
    @IsNumber()
    @IsOptional()
    updateCount?: number;
}
