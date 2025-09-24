import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/category/dto/category.response-dto';
import { UserResponseDto } from 'src/user/dto/user.response-dto';
import { WholesaleResponseDto } from 'src/wholesale/dto/wholesale.response-dto';
import { RetailResponseDto } from 'src/retail/dto/retail.response-dto';
import { B2bResponseDto } from 'src/b2b/dto/b2b.response-dto';
import { productStatus, productType } from '../product.entity';

export class ProductResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'iPhone 15 Pro' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'https://example.com/images/iphone15.jpg' })
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

  @ApiProperty({ example: '999.99' })
  @Expose()
  price: string;

  @ApiProperty({ example: 100 })
  @Expose()
  stockQuantity: number;

  @ApiProperty({ example: 'Latest iPhone model with titanium frame' })
  @Expose()
  productDescription: string;

  @ApiProperty({ enum: productType })
  @Expose()
  productType: productType;

  @ApiProperty({ enum: productStatus })
  @Expose()
  productStatus: productStatus;

  // ------------------- New Fields -------------------
  @ApiProperty({ example: 'Mobile Accessories', required: false })
  @Expose()
  productSubCategory?: string;

  @ApiProperty({ example: 'HSN12345', required: false })
  @Expose()
  hsnCode?: string;

  @ApiProperty({ example: 'SKU-001', required: false })
  @Expose()
  skuCode?: string;

  @ApiProperty({ example: 'Cotton', required: false })
  @Expose()
  materialType?: string;

  @ApiProperty({ example: '80% Cotton, 20% Polyester', required: false })
  @Expose()
  composition?: string;

  @ApiProperty({ example: '180 GSM', required: false })
  @Expose()
  gsm?: string;

  @ApiProperty({ example: '40s', required: false })
  @Expose()
  yarnCount?: string;

  @ApiProperty({ example: 'Striped', required: false })
  @Expose()
  pattern?: string;

  @ApiProperty({ example: ['OEKO-TEX', 'GOTS'], required: false })
  @Expose()
  certifications?: string[];

  @ApiProperty({ example: 'kg' })
  @Expose()
  unitOfMeasurement: string;

  @ApiProperty({ example: 500 })
  @Expose()
  availableQuantity: number;

  @ApiProperty({ example: true })
  @Expose()
  manufacturer: boolean;

  @ApiProperty({ example: 'India', required: false })
  @Expose()
  originCountry?: string;

  @ApiProperty({ example: '1000 units per month', required: false })
  @Expose()
  productionCapacity?: string;
  // ---------------------------------------------------

  @ApiProperty({ example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'], required: false })
  @Expose()
  additionalImages?: string[];

  @ApiProperty({ example: ['electronics', 'smartphone'], required: false })
  @Expose()
  tags?: string[];

  @ApiProperty({ example: 0.5, required: false })
  @Expose()
  weight?: number;

  @ApiProperty({ example: ['Home Delivery', 'Pickup'], required: false })
  @Expose()
  deliveryOptions?: string[];

  @ApiProperty({ example: 899.99, required: false })
  @Expose()
  discountPrice?: number;

  @ApiProperty({ example: ['Black', 'Blue', 'Gold'], required: false })
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

  // ---------------------------------------------------
  @ApiProperty({ example: '2025-09-12T10:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-12T12:30:00.000Z' })
  @Expose()
  updatedAt: Date;

  // Related responses
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
