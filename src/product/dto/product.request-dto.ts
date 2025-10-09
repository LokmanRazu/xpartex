import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class TierPricingDto {
  @ApiProperty({ example: '100-500', description: 'Quantity range for the price tier' })
  @IsString()
  range: string;

  @ApiProperty({ example: 50, description: 'Price for the given range' })
  @IsNumber()
  price: number;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Stainless Steel Water Bottle' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'uuid-of-seller' })
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({ example: 'uuid-of-company-profile' })
  @IsString()
  @IsNotEmpty()
  companyProfileId: string;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({ example: 'uuid-of-sub-category' })
  @IsString()
  @IsOptional()
  subCategoryId?: string;

  @ApiPropertyOptional({ example: 120 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'https://example.com/main-image.jpg' })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiPropertyOptional({
    example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
  })
  @IsArray()
  @IsOptional()
  additional_images?: string[];

  @ApiPropertyOptional({ example: 'https://example.com/video.mp4' })
  @IsString()
  @IsOptional()
  video?: string;

  @ApiPropertyOptional({ example: 'HS123456' })
  @IsString()
  @IsOptional()
  hs_code?: string;

  @ApiPropertyOptional({ example: ['eco-friendly', 'reusable'] })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ example: 'AquaPure' })
  @IsString()
  @IsOptional()
  brand_name?: string;

  @ApiPropertyOptional({ example: 'High-quality stainless steel water bottle' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Double-walled, leak-proof, BPA-free' })
  @IsString()
  @IsOptional()
  key_features?: string;

  @ApiPropertyOptional({ example: 'China' })
  @IsString()
  @IsOptional()
  origin_country?: string;

  @ApiPropertyOptional({ example: 'ISO 9001 Certified' })
  @IsString()
  @IsOptional()
  certifications?: string;

  @ApiPropertyOptional({ example: 'Stainless Steel' })
  @IsString()
  @IsOptional()
  material_type?: string;

  @ApiPropertyOptional({ example: 'Outdoor, Travel, Sports' })
  @IsString()
  @IsOptional()
  usage_application?: string;

  @ApiPropertyOptional({ example: 'per piece' })
  @IsString()
  @IsOptional()
  price_unit?: string;

  @ApiPropertyOptional({ example: ['COD', 'Online', 'Bank Transfer'] })
  @IsArray()
  @IsOptional()
  payment_terms?: string[];

  @ApiPropertyOptional({
    example: 'Packed in cardboard boxes with bubble wrap',
  })
  @IsString()
  @IsOptional()
  packaging_details?: string;

  @ApiPropertyOptional({ example: 'FOB, CIF, EXW' })
  @IsString()
  @IsOptional()
  delivery_terms?: string;

  @ApiPropertyOptional({ example: '30% advance, 70% on delivery' })
  @IsString()
  @IsOptional()
  trade_terms?: string;

  @ApiPropertyOptional({ example: 'Return within 7 days if defective' })
  @IsString()
  @IsOptional()
  return_policy?: string;

  @ApiPropertyOptional({ example: '1-year manufacturer warranty' })
  @IsString()
  @IsOptional()
  warranty?: string;

  @ApiPropertyOptional({ example: 500 })
  @IsNumber()
  @IsOptional()
  stock_quantity?: number;

  @ApiPropertyOptional({ example: ['Red', 'Blue', 'Green'] })
  @IsArray()
  @IsOptional()
  colorVariants?: string[];

  @ApiPropertyOptional({ example: ['S', 'M', 'L'] })
  @IsArray()
  @IsOptional()
  available_sizes?: string[];

  @ApiPropertyOptional({ example: 25.5 })
  @IsNumber()
  @IsOptional()
  price_per_unit?: number;

  @ApiPropertyOptional({ example: '3-5 business days' })
  @IsString()
  @IsOptional()
  shipping_time?: string;

  @ApiPropertyOptional({ example: ['Air', 'Sea', 'Land'] })
  @IsArray()
  @IsOptional()
  shipping_methods?: string[];

  @ApiPropertyOptional({ example: 15.5 })
  @IsNumber()
  @IsOptional()
  shipping_cost?: number;

  @ApiPropertyOptional({ example: 'Port of Shanghai' })
  @IsString()
  @IsOptional()
  port_of_shipment?: string;

  @ApiPropertyOptional({
    type: [TierPricingDto],
    example: [
      { range: '100-500', price: 45 },
      { range: '501-1000', price: 40 },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => TierPricingDto)
  @IsOptional()
  tier_pricing?: TierPricingDto[];

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  is_b2b?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  is_wholesale?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  is_retail?: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  moq?: number;
}
