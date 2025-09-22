import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/category/dto/category.response-dto';
import { UserResponseDto } from 'src/user/dto/user.response-dto';
import { User } from 'src/user/user.entity';
import { WholesaleResponseDto } from 'src/wholesale/dto/wholesale.response-dto';
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

  @ApiProperty({ example: 'Smartphone', description: 'Category of the product' })
  @Type(() => UserResponseDto)
  @Expose()
  seller: UserResponseDto;

  @ApiProperty({ example: 'Smartphone', description: 'Category of the product' })
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

  @ApiProperty({ example: '2025-09-12T10:00:00.000Z', description: 'Product creation timestamp' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-12T12:30:00.000Z', description: 'Product last update timestamp' })
  @Expose()
  updatedAt: Date;

  // @ApiProperty({ type: [WholesaleResponseDto] })
  // @Expose()
  // @Type(() => WholesaleResponseDto)
  // wholesales: WholesaleResponseDto[];
}
