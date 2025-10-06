import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, IsBoolean, ValidateNested, } from 'class-validator';
import { ListingType } from '../product.entity';
import { Type } from 'class-transformer';

class TierPriceingDto {
  @ApiProperty({ example: '1000' })
  @IsString({ message: 'Title must be a string' })
  range: string;

  @ApiProperty({ example: 'Black color, 256GB' })
  @IsNumber({})
  price: number;
}

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro', description: 'Product title' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Seller ID' })
  @IsString({ message: 'Seller ID must be a string' })
  sellerId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Brand ID' })
  @IsString({ message: 'Brand ID must be a string' })
  categoryId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Category ID' })
  @IsString({ message: 'Category ID must be a string' })
  company_id: string;

  @ApiProperty({ type: [TierPriceingDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => TierPriceingDto)
  @IsOptional()
  tier_pricing?: TierPriceingDto[];

  @ApiProperty({ example: '[https://example.com/img.jpg](https://example.com/img.jpg)', description: 'Main product image URL', format: 'binary' })
  @IsString({ message: 'Image must be a string URL' })
  @IsNotEmpty({ message: 'Image is required' })
  img: string;

  @ApiProperty({ example: ['[https://example.com/img1.jpg](https://example.com/img1.jpg)', '[https://example.com/img2.jpg](https://example.com/img2.jpg)'], format: 'binary', required: false })
  @IsArray({ message: 'Additional images must be an array' })
  @IsString({ each: true, message: 'Each additional image must be a string URL' })
  @IsOptional()
  additional_images?: string[];

  @ApiProperty({ enum: ListingType, description: 'Listing type (b2b, wholesale, retail)' })
  @IsEnum(ListingType, { message: 'Listing type must be one of: b2b, wholesale, retail' })
  @IsNotEmpty({ message: 'Listing type is required' })
  listing_type: ListingType;

  @ApiProperty({ example: ['electronics', 'smartphone'], required: false })
  @IsArray({ message: 'Tags must be an array' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ example: 'Apple', required: false })
  @IsString({ message: 'Brand name must be a string' })
  @IsOptional()
  brand_name?: string;

  @ApiProperty({ example: 'HSN12345', required: false })
  @IsString({ message: 'HS code must be a string' })
  @IsOptional()
  hs_code?: string;

  @ApiProperty({ example: 'Latest iPhone model', required: false })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Titanium frame, 256GB storage', required: false })
  @IsString({ message: 'Key features must be a string' })
  @IsOptional()
  key_features?: string;

  @ApiProperty({ example: '[https://example.com/video.mp4](https://example.com/video.mp4)', required: false })
  @IsString({ message: 'Video URL must be a string' })
  @IsOptional()
  video_url?: string;

  @ApiProperty({ example: 'India', required: false })
  @IsString({ message: 'Origin country must be a string' })
  @IsOptional()
  origin_country?: string;

  @ApiProperty({ example: 'OEKO-TEX, GOTS', required: false })
  @IsString({ message: 'Certifications must be a string' })
  @IsOptional()
  certifications?: string;

  @ApiProperty({ example: 'Cotton', required: false })
  @IsString({ message: 'Material type must be a string' })
  @IsOptional()
  material_type?: string;

  @ApiProperty({ example: 'T-shirt Production', required: false })
  @IsString({ message: 'Usage/Application must be a string' })
  @IsOptional()
  usage_application?: string;

  @ApiProperty({ example: 100, required: false })
  @IsNumber({}, { message: 'MOQ must be a number' })
  @IsOptional()
  moq?: number;

  @ApiProperty({ example: '1000 pcs/month', required: false })
  @IsString({ message: 'Supply ability must be a string' })
  @IsOptional()
  supply_ability?: string;

  @ApiProperty({ example: '7-10 business days', required: false })
  @IsString({ message: 'Lead time must be a string' })
  @IsOptional()
  lead_time?: string;

  @ApiProperty({ example: 'USD', required: false })
  @IsString({ message: 'Price unit must be a string' })
  @IsOptional()
  price_unit?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  payment_terms?: string[];

  @ApiProperty({ example: 'Eco-friendly packaging', required: false })
  @IsString({ message: 'Packaging details must be a string' })
  @IsOptional()
  packaging_details?: string;

  @ApiProperty({ example: 'Chittagong Port', required: false })
  @IsString({ message: 'Port of shipment must be a string' })
  @IsOptional()
  port_of_shipment?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean({ message: 'Sample available must be a boolean' })
  @IsOptional()
  sample_available?: boolean;

  @ApiProperty({ example: 20.5, required: false })
  @IsNumber({}, { message: 'Sample cost must be a number' })
  @IsOptional()
  sample_cost?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean({ message: 'Customization available must be a boolean' })
  @IsOptional()
  customization_available?: boolean;

  @ApiProperty({ example: 'Color, Size', required: false })
  @IsString({ message: 'Customization type must be a string' })
  @IsOptional()
  customization_type?: string;

  @ApiProperty({ example: 'FOB', required: false })
  @IsString({ message: 'Delivery terms must be a string' })
  @IsOptional()
  delivery_terms?: string;

  @ApiProperty({ example: 'CIF', required: false })
  @IsString({ message: 'Trade terms must be a string' })
  @IsOptional()
  trade_terms?: string;

  @ApiProperty({ example: '7-day return policy', required: false })
  @IsString({ message: 'Return policy must be a string' })
  @IsOptional()
  return_policy?: string;

  @ApiProperty({ example: '1 year warranty', required: false })
  @IsString({ message: 'Warranty must be a string' })
  @IsOptional()
  warranty?: string;

  @ApiProperty({ example: 1000, required: false })
  @IsNumber({}, { message: 'Stock quantity must be a number' })
  @IsOptional()
  stock_quantity?: number;

  @ApiProperty({ example: ['Black', 'Blue'], required: false })
  @IsArray({ message: 'Color variants must be an array' })
  @IsString({ each: true, message: 'Each color must be a string' })
  @IsOptional()
  colorVariants?: string[];

  @ApiProperty({ example: ['S', 'M', 'L'], required: false })
  @IsArray({ message: 'Available sizes must be an array' })
  @IsString({ each: true, message: 'Each size must be a string' })
  @IsOptional()
  available_sizes?: string[];

  @ApiProperty({ example: 999.99, required: false })
  @IsNumber({}, { message: 'Price per unit must be a number' })
  @IsOptional()
  price_per_unit?: number;

  @ApiProperty({ example: 'Air, Sea, Courier', required: false })
  @IsString({ message: 'Shipping methods must be a string' })
  @IsOptional()
  shipping_methods?: string;

  @ApiProperty({ example: 50, required: false })
  @IsNumber({}, { message: 'Shipping cost must be a number' })
  @IsOptional()
  shipping_cost?: number;

  @ApiProperty({ example: '7 days', required: false })
  @IsString({ message: 'Shipping time must be a string' })
  @IsOptional()
  shipping_time?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsBoolean({ message: 'Is active must be a boolean' })
  @IsOptional()
  is_active?: boolean;
}
