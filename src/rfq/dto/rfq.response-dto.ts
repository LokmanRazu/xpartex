import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from 'src/product/dto/product.response-dto';
import { UserResponseDto } from 'src/user/dto/user.response-dto';


export class RfqResponseDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique RFQ ID (UUID)' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'Request for 500 Steel Bolts', description: 'Title or short description of the RFQ' })
    @Expose()
    title: string;

    @ApiProperty({ example: 500, description: 'Requested quantity of the product' })
    @Expose()
    quantity: number;

    @ApiProperty({ example: 'pcs', description: 'Unit of measurement (e.g., pcs, kg, liters)' })
    @Expose()
    unit: string;

    @ApiProperty({ example: '2025-10-01', description: 'Date when the RFQ was created or required' })
    @Expose()
    date: Date;

    @ApiProperty({ example: 'https://example.com/specifications.pdf', description: 'Optional supporting file (URL or filename)' })
    @Expose()
    file?: string;

    @ApiProperty({ example: 'Dhaka, Bangladesh', description: 'Region or location where the product is needed' })
    @Expose()
    region: string;

    @ApiProperty({ description: 'Buyer who created the RFQ' })
    @Type(() => UserResponseDto)
    @Expose()
    buyer: UserResponseDto;

    @ApiProperty({ description: 'Product requested in the RFQ' })
    @Type(() => ProductResponseDto)
    @Expose()
    product: ProductResponseDto;

    @ApiProperty({ example: '2025-09-12T10:00:00.000Z', description: 'Product creation timestamp' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2025-09-12T12:30:00.000Z', description: 'Product last update timestamp' })
    @Expose()
    updatedAt: Date;
}
