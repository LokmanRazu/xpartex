import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ListingType } from '../product.entity';
import { UserResponseDto } from '../../user/dto/user.response-dto';
import { CategoryResponseDto } from '../../category/dto/category.response-dto';

class TierPriceingresponseDto {
  @ApiProperty({ example: 10 - 100 })
  @Expose()
  range: string;

  @ApiProperty({ example: 1000 })
  @Expose()
  price: number;
}

export class ProductResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'iPhone 15 Pro' })
  @Expose()
  title: string;

  @ApiProperty({ description: 'Seller details' })
  @Type(() => UserResponseDto)
  @Expose()
  seller: UserResponseDto;

  @ApiProperty({ description: 'Category details' })
  @Type(() => CategoryResponseDto)
  @Expose()
  category: CategoryResponseDto;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  company_id: string;

  @ApiProperty({ type: [TierPriceingresponseDto], required: false })
  @Expose()
  tier_pricing?: TierPriceingresponseDto[];

  @ApiProperty({ example: '[https://example.com/img.jpg](https://example.com/img.jpg)' })
  @Expose()
  img: string;

  @ApiProperty({ example: ['[https://example.com/img1.jpg](https://example.com/img1.jpg)', '[https://example.com/img2.jpg](https://example.com/img2.jpg)'], required: false })
  @Expose()
  additional_images?: string[];

  @ApiProperty({ enum: ListingType, description: 'Listing type (b2b, wholesale, retail)' })
  @Expose()
  listing_type: ListingType;

  @ApiProperty({ example: ['electronics', 'smartphone'], required: false })
  @Expose()
  tags?: string[];

  @ApiProperty({ example: 'Apple', required: false })
  @Expose()
  brand_name?: string;

  @ApiProperty({ example: 'HSN12345', required: false })
  @Expose()
  hs_code?: string;

  @ApiProperty({ example: 'Latest iPhone model', required: false })
  @Expose()
  description?: string;

  @ApiProperty({ example: 'Titanium frame, 256GB storage', required: false })
  @Expose()
  key_features?: string;

  @ApiProperty({ example: '[https://example.com/video.mp4](https://example.com/video.mp4)', required: false })
  @Expose()
  video_url?: string;

  @ApiProperty({ example: 'India', required: false })
  @Expose()
  origin_country?: string;

  @ApiProperty({ example: 'OEKO-TEX, GOTS', required: false })
  @Expose()
  certifications?: string;

  @ApiProperty({ example: 'Cotton', required: false })
  @Expose()
  material_type?: string;

  @ApiProperty({ example: 'T-shirt Production', required: false })
  @Expose()
  usage_application?: string;

  @ApiProperty({ example: 100, required: false })
  @Expose()
  moq?: number;

  @ApiProperty({ example: '1000 pcs/month', required: false })
  @Expose()
  supply_ability?: string;

  @ApiProperty({ example: '7-10 business days', required: false })
  @Expose()
  lead_time?: string;

  @ApiProperty({ example: 'USD', required: false })
  @Expose()
  price_unit?: string;

  @ApiProperty({})
  @Expose()
  payment_terms?: string[];

  @ApiProperty({ example: 'Eco-friendly packaging', required: false })
  @Expose()
  packaging_details?: string;

  @ApiProperty({ example: 'Chittagong Port', required: false })
  @Expose()
  port_of_shipment?: string;

  @ApiProperty({ example: true, required: false })
  @Expose()
  sample_available?: boolean;

  @ApiProperty({ example: 20.5, required: false })
  @Expose()
  sample_cost?: number;

  @ApiProperty({ example: true, required: false })
  @Expose()
  customization_available?: boolean;

  @ApiProperty({ example: 'Color, Size', required: false })
  @Expose()
  customization_type?: string;

  @ApiProperty({ example: 'FOB', required: false })
  @Expose()
  delivery_terms?: string;

  @ApiProperty({ example: 'CIF', required: false })
  @Expose()
  trade_terms?: string;

  @ApiProperty({ example: '7-day return policy', required: false })
  @Expose()
  return_policy?: string;

  @ApiProperty({ example: '1 year warranty', required: false })
  @Expose()
  warranty?: string;

  @ApiProperty({ example: 1000, required: false })
  @Expose()
  stock_quantity?: number;

  @ApiProperty({ example: ['Black', 'Blue'], required: false })
  @Expose()
  colorVariants?: string[];

  @ApiProperty({ example: ['S', 'M', 'L'], required: false })
  @Expose()
  available_sizes?: string[];

  @ApiProperty({ example: 999.99, required: false })
  @Expose()
  price_per_unit?: number;

  @ApiProperty({ example: 'Air, Sea, Courier', required: false })
  @Expose()
  shipping_methods?: string;

  @ApiProperty({ example: 50, required: false })
  @Expose()
  shipping_cost?: number;

  @ApiProperty({ example: '7 days', required: false })
  @Expose()
  shipping_time?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @Expose()
  is_active?: boolean;

  @ApiProperty({ example: '2025-09-12T10:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-12T12:30:00.000Z' })
  @Expose()
  updatedAt: Date;
}
