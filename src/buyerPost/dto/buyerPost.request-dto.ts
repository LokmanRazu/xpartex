import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ProductStatus } from '../buyerPost.entity';

export class CreateBuyerPostDto {
  @ApiProperty({ required: true, example: 'Looking for a house in New York' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ required: false, example: 'Description about the product or service' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true, example: 'user-uuid' })
  @IsString({ message: 'user ID must be a string' })
  @IsNotEmpty({ message: 'user ID is required' })
  userId: string;

  @ApiProperty({ required: true, example: 'category-uuid' })
  @IsString({ message: 'Category ID must be a string' })
  @IsNotEmpty({ message: 'Category ID is required' })
  categoryId: string;

  @ApiProperty({ required: false, example: 1000.50 })
  @IsNumber({}, { message: 'Target price must be a number' })
  @IsOptional()
  target_price?: number;

  @ApiProperty({ required: false, example: 5 })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsOptional()
  quantity?: number;

  @ApiProperty({ required: false, example: 'kg' })
  @IsString({ message: 'Unit must be a string' })
  @IsOptional()
  unit?: string;

  @ApiProperty({ required: false, example: 'New York, USA' })
  @IsString({ message: 'Location must be a string' })
  @IsOptional()
  location?: string;

  @ApiProperty({ required: false, example: '2025-09-15' })
  @IsDateString({}, { message: 'Deadline must be a valid date string (ISO format)' })
  @IsOptional()
  deadline?: Date;

  @ApiPropertyOptional({ required: false, example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' ,format:'binary'})
  @IsString({ message: 'Attachment must be a string' })
  @IsOptional()
  attachment:string

  @ApiProperty({ required: false, enum: ProductStatus, example: ProductStatus.OPEN })
  @IsEnum(ProductStatus, { message: 'Status must be either open or closed' })
  @IsOptional()
  status?: ProductStatus;
}
