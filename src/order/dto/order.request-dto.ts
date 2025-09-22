import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "src/orderItem/dto/orderItem.request-dto";

export class CreateOrderDto {
  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab', description: 'Product linked to this order' })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab', description: 'User/Buyer linked to this order' })
  @IsUUID('4', { message: 'BuyerId must be a valid UUID' })
  @IsNotEmpty({ message: 'BuyerId is required' })
  buyerId: string;

  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    description: 'Current status of the order',
  })
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], {
    message: 'Status must be one of: pending, processing, shipped, delivered, cancelled',
  })
  status: string;

  @ApiProperty({ example: 199.99, description: 'Total amount of the order' })
  @IsNumber({}, { message: 'Total amount must be a number' })
  @Min(0, { message: 'Total amount must be at least 0' })
  totalAmount: number;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab', description: 'Product linked to this order' })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  orderItemsId: string;
}