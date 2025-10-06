import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the user adding the product to cart' })
  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @ApiProperty({ example: '987e6543-e21b-32d3-c456-426614174999', description: 'ID of the product to add to cart' })
  @IsString({ message: 'Product ID must be a string' })
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
