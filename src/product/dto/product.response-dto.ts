import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ListingType } from '../product.entity';
import { UserResponseDto } from '../../user/dto/user.response-dto';
import { CategoryResponseDto } from '../../category/dto/category.response-dto';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @ApiProperty({ example: 1000, nullable: true })
  @Expose()
  price: number;

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

  @ApiProperty({ example: 'Latest iPhone model', required: false })
  @Expose()
  description?: string;

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

  @ApiProperty({ example: 'FOB', required: false })
  @Expose()
  delivery_terms?: string;


  @ApiProperty({ example: '7-day return policy', required: false })
  @Expose()
  return_policy?: string;

  @ApiProperty({ example: '1 year warranty', required: false })
  @Expose()
  warranty?: string;

  @ApiProperty({ example: ['Black', 'Blue'], required: false })
  @Expose()
  colorVariants?: string[];

  @ApiProperty({ example: ['S', 'M', 'L'], required: false })
  @Expose()
  available_sizes?: string[];

  @ApiProperty({ example: 'Air, Sea, Courier', required: false })
  @Expose()
  shipping_methods?: string;

  @ApiProperty({ example: '7 days', required: false })
  @Expose()
  shipping_time?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @Expose()
  is_active?: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
