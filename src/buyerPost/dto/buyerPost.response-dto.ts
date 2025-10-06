import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductStatus } from '../buyerPost.entity';
import { UserResponseDto } from '../../user/dto/user.response-dto';
import { CategoryResponseDto } from '../../category/dto/category.response-dto';

export class BuyerPostResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Looking for a house in New York' })
  @Expose()
  title: string;

  @ApiProperty({ required: false, example: 'Description about the buyer post' })
  @Expose()
  description?: string;

  @ApiProperty({ description: 'Seller details' })
  @Type(() => UserResponseDto)
  @Expose()
  user: UserResponseDto;

  @ApiProperty({ description: 'Seller details' })
  @Type(() => CategoryResponseDto)
  @Expose()
  category: CategoryResponseDto;

  @ApiProperty({ required: false, example: 1000.50 })
  @Expose()
  target_price?: number;

  @ApiProperty({ required: false, example: 5 })
  @Expose()
  quantity?: number;

  @ApiProperty({ required: false, example: 'kg' })
  @Expose()
  unit?: string;

  @ApiProperty({ required: false, example: 'New York, USA' })
  @Expose()
  location?: string;

  @ApiProperty({ required: false, example: '2025-09-15' })
  @Expose()
  @Type(() => Date)
  deadline?: Date;

  @ApiProperty({ enum: ProductStatus, example: ProductStatus.OPEN })
  @Expose()
  status: ProductStatus;

  @ApiProperty({ example: '2025-10-06T12:00:00Z' })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ example: '2025-10-06T12:00:00Z' })
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
