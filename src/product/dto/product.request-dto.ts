import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ListingType } from '../product.entity';

class TierPricingDto {
  @ApiProperty({ example: '100-500', description: 'Quantity range for this price tier' })
  @IsString({ message: 'Range must be a string' })
  range: string;

  @ApiProperty({ example: 950, description: 'Unit price for the given range' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;
}

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro', description: 'Product title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'seller-uuid', description: 'Seller ID' })
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({ example: 'company-uuid', description: 'Company ID' })
  @IsString()
  @IsOptional()
  company_id?: string;

  @ApiProperty({ example: 'category-uuid', description: 'Category ID' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 999, description: 'Product base price' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsOptional()
  price?: number;

  @ApiProperty({ type: [TierPricingDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => TierPricingDto)
  @IsOptional()
  tier_pricing?: TierPricingDto[];

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Main product image URL' })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({
    example: ['https://example.com/1.jpg', 'https://example.com/2.jpg'],
    description: 'Additional product images',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  additional_images?: string[];

  @ApiProperty({
    enum: ListingType,
    example: ListingType.B2B,
    description: 'Listing type (b2b, wholesale, retail)',
  })
  @IsEnum(ListingType)
  @IsNotEmpty()
  listing_type: ListingType;

  @ApiProperty({ example: ['electronics', 'smartphone'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ example: 'Apple', required: false })
  @IsString()
  @IsOptional()
  brand_name?: string;

  @ApiProperty({ example: 'HSN12345', required: false })
  @IsString()
  @IsOptional()
  hs_code?: string;

  @ApiProperty({ example: 'Latest iPhone with A17 chip', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Titanium frame, 256GB storage', required: false })
  @IsString()
  @IsOptional()
  key_features?: string;

  @ApiProperty({ example: 'https://example.com/video.mp4', required: false })
  @IsString()
  @IsOptional()
  video_url?: string;

  @ApiProperty({ example: 'China', required: false })
  @IsString()
  @IsOptional()
  origin_country?: string;

  @ApiProperty({ example: 'ISO 9001, CE', required: false })
  @IsString()
  @IsOptional()
  certifications?: string;

  @ApiProperty({ example: 'Aluminum', required: false })
  @IsString()
  @IsOptional()
  material_type?: string;

  @ApiProperty({ example: 'Phone Manufacturing', required: false })
  @IsString()
  @IsOptional()
  usage_application?: string;

  @ApiProperty({ example: 100, required: false })
  @IsNumber()
  @IsOptional()
  moq?: number;

  @ApiProperty({ example: '500 units/month', required: false })
  @IsString()
  @IsOptional()
  supply_ability?: string;

  @ApiProperty({ example: '7-10 business days', required: false })
  @IsString()
  @IsOptional()
  lead_time?: string;

  @ApiProperty({ example: 'USD', required: false })
  @IsString()
  @IsOptional()
  price_unit?: string;

  @ApiProperty({ example: ['Online', 'Bank Transfer'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  payment_terms?: string[];

  @ApiProperty({ example: 'Eco-friendly packaging', required: false })
  @IsString()
  @IsOptional()
  packaging_details?: string;

  @ApiProperty({ example: 'Chittagong Port', required: false })
  @IsString()
  @IsOptional()
  port_of_shipment?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  sample_available?: boolean;

  @ApiProperty({ example: 25.5, required: false })
  @IsNumber()
  @IsOptional()
  sample_cost?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  customization_available?: boolean;

  @ApiProperty({ example: 'Color, Size', required: false })
  @IsString()
  @IsOptional()
  customization_type?: string;

  @ApiProperty({ example: 'FOB', required: false })
  @IsString()
  @IsOptional()
  delivery_terms?: string;

  @ApiProperty({ example: 'CIF', required: false })
  @IsString()
  @IsOptional()
  trade_terms?: string;

  @ApiProperty({ example: '7-day return policy', required: false })
  @IsString()
  @IsOptional()
  return_policy?: string;

  @ApiProperty({ example: '1 year warranty', required: false })
  @IsString()
  @IsOptional()
  warranty?: string;

  @ApiProperty({ example: 2000, required: false })
  @IsNumber()
  @IsOptional()
  stock_quantity?: number;

  @ApiProperty({ example: ['Black', 'Silver'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colorVariants?: string[];

  @ApiProperty({ example: ['S', 'M', 'L'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  available_sizes?: string[];

  @ApiProperty({ example: 999.99, required: false })
  @IsNumber()
  @IsOptional()
  price_per_unit?: number;

  @ApiProperty({ example: 'Air, Sea, Courier', required: false })
  @IsString()
  @IsOptional()
  shipping_methods?: string;

  @ApiProperty({ example: 50, required: false })
  @IsNumber()
  @IsOptional()
  shipping_cost?: number;

  @ApiProperty({ example: '7 days', required: false })
  @IsString()
  @IsOptional()
  shipping_time?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

