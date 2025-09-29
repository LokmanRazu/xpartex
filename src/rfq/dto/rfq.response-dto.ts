import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from '../../product/dto/product.response-dto';
import { UserResponseDto } from '../../user/dto/user.response-dto';
import { RfqStatus } from '../rfq.entity';

export class RfqResponseDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'Unique RFQ ID (UUID)',
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'Request for 500 Steel Bolts',
        description: 'Title or short description of the RFQ',
    })
    @Expose()
    title: string;

    @ApiProperty({ example: RfqStatus.OPEN, enum: RfqStatus })
    @Expose()
    status: RfqStatus;

    @ApiProperty({ example: 500, description: 'Requested quantity of the product' })
    @Expose()
    quantity: number;

    @ApiProperty({
        example: 'pcs',
        description: 'Unit of measurement (e.g., pcs, kg, liters)',
    })
    @Expose()
    unit: string;

    @ApiProperty({
        example: '7-10 days',
        description: 'lead time',
    })
    @Expose()
    leadTime: string;

    @ApiProperty({
        example: 'https://example.com/specifications.pdf',
        description: 'Optional supporting file (URL or filename)',
        required: false,
    })
    @Expose()
    file?: string;

    @ApiProperty({
        example: 'Dhaka, Bangladesh',
        description: 'Region or location where the product is needed',
    })
    @Expose()
    region: string;

    @ApiProperty({ description: 'Buyer who will get the RFQ' })
    @Type(() => UserResponseDto)
    @Expose()
    buyer: UserResponseDto;

    @ApiProperty({ description: 'rfqBySeler who created the RFQ' })
    @Type(() => UserResponseDto)
    @Expose()
    rfqBySelerId: UserResponseDto;

    @ApiProperty({ description: 'Product requested in the RFQ' })
    @Type(() => ProductResponseDto)
    @Expose()
    product: ProductResponseDto;

    // ✅ New fields
    @ApiProperty({
        example: 'FOB, Delivered at Port',
        description: 'Delivery terms agreed between buyer and seller',
    })
    @Expose()
    deliveryTerms: string;

    @ApiProperty({
        example: '50% advance, 50% on delivery',
        description: 'Payment terms for the RFQ',
    })
    @Expose()
    paymentTerms: string;

    @ApiProperty({
        example: '12 months warranty from date of delivery',
        description: 'Warranty period for the requested product',
    })
    @Expose()
    warrantyPeriod: string;

    @ApiProperty({
        example: 'USD',
        description: 'Currency in which the transaction will be made',
    })
    @Expose()
    currency: string;

    @ApiProperty({
        example: '123 Main Street, Dhaka, Bangladesh',
        description: 'Shipping address where goods should be delivered',
    })
    @Expose()
    shippingAddress: string;

    @ApiProperty({
        example: 'Handle with care, fragile items',
        description: 'Any special instructions related to the RFQ',
        required: false,
    })
    @Expose()
    specialInstructions?: string;

    @ApiProperty({
        example: '2025-09-12T10:00:00.000Z',
        description: 'RFQ creation timestamp',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: '2025-09-12T12:30:00.000Z',
        description: 'RFQ last update timestamp',
    })
    @Expose()
    updatedAt: Date;
}
