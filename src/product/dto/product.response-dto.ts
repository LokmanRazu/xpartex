import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { CompanyProfileResponseDto } from "../../companyProfile/dto/companyProfile.response-dto";
import { UserResponseDto } from "../../user/dto/user.response-dto";
import { CategoryResponseDto } from "../../category/dto/category.response-dto";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class TierPricingResponseDto {
  @ApiProperty({ example: '100-500' })
  @Expose()
  range: string;

  @ApiProperty({ example: 50 })
  @Expose()
  price: number;
}

export class ProductResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Stainless Steel Water Bottle' })
  @Expose()
  title: string;

  @ApiProperty({ description: 'Seller details' })
  @Type(() => UserResponseDto)
  @Expose()
  seller: UserResponseDto;

  @ApiProperty({ description: 'Company profile details' })
  @Type(() => CompanyProfileResponseDto)
  @Expose()
  company: CompanyProfileResponseDto;

  @ApiProperty({ description: 'Category details' })
  @Type(() => CategoryResponseDto)
  @Expose()
  category: CategoryResponseDto;

  // @ApiProperty({ example: 120, nullable: true })
  // @Expose()
  // price?: number;

  @ApiProperty({ example: 'https://example.com/main.jpg' })
  @Expose()
  img: string;

  @ApiProperty({
    example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
    required: false,
  })
  @Expose()
  additional_images?: string[];

  @ApiProperty({ example: 'AquaFresh', required: false })
  @Expose()
  hs_code?: string;

  // @ApiProperty({ enum: ListingType, example: ListingType.B2B })
  // @Expose()
  // listing_type: ListingType;

  @ApiProperty({ example: ['eco-friendly', 'reusable'], required: false })
  @Expose()
  tags?: string[];

  @ApiProperty({ example: 'AquaPure', required: false })
  @Expose()
  brand_name?: string;

  @ApiProperty({ example: 'High-quality stainless steel bottle', required: false })
  @Expose()
  description?: string;

  @ApiProperty({ example: 'Double-walled, leak-proof, BPA-free', required: false })
  @Expose()
  key_features?: string;

  @ApiProperty({ example: 'China', required: false })
  @Expose()
  origin_country?: string;

  @ApiProperty({ example: 'ISO 9001 Certified', required: false })
  @Expose()
  certifications?: string;

  @ApiProperty({ example: 'Stainless Steel', required: false })
  @Expose()
  material_type?: string;

  @ApiProperty({ example: 'Outdoor, Travel, Sports', required: false })
  @Expose()
  usage_application?: string;

  @ApiProperty({ example: 'per piece', required: false })
  @Expose()
  price_unit?: string;

  @ApiProperty({ example: ['COD', 'Online', 'Bank Transfer'], required: false })
  @Expose()
  payment_terms?: string[];

  @ApiProperty({ example: 'Packed in cardboard boxes', required: false })
  @Expose()
  packaging_details?: string;

  @ApiProperty({ example: 'FOB, CIF, EXW', required: false })
  @Expose()
  delivery_terms?: string;

  @ApiProperty({ example: '30% advance, 70% on delivery', required: false })
  @Expose()
  trade_terms?: string;

  @ApiProperty({ example: 'Return within 7 days if defective', required: false })
  @Expose()
  return_policy?: string;

  @ApiProperty({ example: '1-year manufacturer warranty', required: false })
  @Expose()
  warranty?: string;

  @ApiProperty({ example: 500, required: false })
  @Expose()
  stock_quantity?: number;

  @ApiProperty({ example: ['Red', 'Blue', 'Green'], required: false })
  @Expose()
  colorVariants?: string[];

  @ApiProperty({ example: ['S', 'M', 'L'], required: false })
  @Expose()
  available_sizes?: string[];

  @ApiProperty({ example: 25.5, required: false })
  @Expose()
  price_per_unit?: number;

  @ApiProperty({ example: '3-5 business days', required: false })
  @Expose()
  shipping_time?: string;

  @ApiProperty({
    type: [TierPricingResponseDto],
    example: [
      { range: '100-500', price: 45 },
      { range: '501-1000', price: 40 },
    ],
    required: false,
  })
  @Type(() => TierPricingResponseDto)
  @Expose()
  tier_pricing?: TierPricingResponseDto[];



  @ApiProperty({ example: true, default: true })
  @Expose()
  is_active: boolean;

  @ApiProperty({ example: 25, required: false })
  @Expose()
  moq?: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Expose()
  updated_at: Date;
}