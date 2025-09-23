import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/category/dto/category.response-dto';
import { UserResponseDto } from 'src/user/dto/user.response-dto';
import { WholesaleResponseDto } from 'src/wholesale/dto/wholesale.response-dto';
import { RetailResponseDto } from 'src/retail/dto/retail.response-dto';
import { B2bResponseDto } from 'src/b2b/dto/b2b.response-dto';
import { productType } from '../product.entity';

export class ProductResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique product ID (UUID)' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'iPhone 15 Pro', description: 'Name of the product' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'https://example.com/images/iphone15.jpg', description: 'Product image URL' })
  @Expose()
  img: string;

  @ApiProperty({ description: 'Seller details' })
  @Type(() => UserResponseDto)
  @Expose()
  seller: UserResponseDto;

  @ApiProperty({ description: 'Category details' })
  @Type(() => CategoryResponseDto)
  @Expose()
  category: CategoryResponseDto;

  @ApiProperty({ example: '999.99', description: 'Price of the product' })
  @Expose()
  price: string;

  @ApiProperty({ example: 100, description: 'Available stock quantity' })
  @Expose()
  stockQuantity: number;

  @ApiProperty({ example: 'Latest iPhone model with titanium frame', description: 'Detailed description of the product' })
  @Expose()
  productDescription: string;

  @ApiProperty({ enum: productType })
  @Expose()
  productType: productType;

  // ---------------- New fields ----------------
  @ApiProperty({ example: ['https://example.com/img1.jpg','https://example.com/img2.jpg'], required: false })
  @Expose()
  additionalImages?: string[];

  @ApiProperty({ example: ['electronics','smartphone'], required: false })
  @Expose()
  tags?: string[];

  @ApiProperty({ example: 0.5, description: 'Weight in kg', required: false })
  @Expose()
  weight?: number;

  @ApiProperty({ example: ['Home Delivery','Pickup'], required: false })
  @Expose()
  deliveryOptions?: string[];

  @ApiProperty({ example: 899.99, description: 'Discounted price', required: false })
  @Expose()
  discountPrice?: number;

  @ApiProperty({ example: ['Black','Blue','Gold'], required: false })
  @Expose()
  colorVariants?: string[];

  @ApiProperty({ example: '7-day return policy', required: false })
  @Expose()
  returnPolicy?: string;

  @ApiProperty({ example: 'Ships in eco-friendly packaging', required: false })
  @Expose()
  packagingDetails?: string;

  @ApiProperty({ example: '7-10 business days', required: false })
  @Expose()
  leadTime?: string;

  @ApiProperty({ example: true, required: false })
  @Expose()
  negotiablePrice?: boolean;

  @ApiProperty({ example: true, required: false })
  @Expose()
  sampleAvailability?: boolean;

  @ApiProperty({ example: false, required: false })
  @Expose()
  customBiddingOption?: boolean;
  // ------------------------------------------------

  @ApiProperty({ example: '2025-09-12T10:00:00.000Z', description: 'Product creation timestamp' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-12T12:30:00.000Z', description: 'Product last update timestamp' })
  @Expose()
  updatedAt: Date;

  // Optional related responses
  @ApiProperty({ type: [WholesaleResponseDto], required: false })
  @Expose()
  @Type(() => WholesaleResponseDto)
  wholesales?: WholesaleResponseDto[];

  @ApiProperty({ type: [RetailResponseDto], required: false })
  @Expose()
  @Type(() => RetailResponseDto)
  retails?: RetailResponseDto[];

  @ApiProperty({ type: [B2bResponseDto], required: false })
  @Expose()
  @Type(() => B2bResponseDto)
  b2bs?: B2bResponseDto[];
}
