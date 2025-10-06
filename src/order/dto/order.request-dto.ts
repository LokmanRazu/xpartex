import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";
import { OrderStatus } from "../order.entity";


export class CreateOrderDto {
  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab', description: 'Product linked to this order' })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab', description: 'User/Buyer linked to this order' })
  @IsUUID('4', { message: 'BuyerId must be a valid UUID' })
  @IsNotEmpty({ message: 'BuyerId is required' })
  buyerId: string;

  // @ApiProperty({
  //   example: OrderStatus.PENDING,
  //   enum: OrderStatus,
  //   description: 'Current status of the order',
  // })
  // @IsEnum(OrderStatus, {
  //   message: 'Status must be one of: pending, processing, shipped, delivered, cancelled',
  // })
  // status: OrderStatus;

  @ApiProperty({ example: 5, description: 'Quantity of the order' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @ApiProperty({ example: 9.99, description: 'Unit price of the order' })
  @IsNumber({}, { message: 'Unit price must be a number' })
  @Min(0, { message: 'Unit price must be at least 0' })
  price: number;

  // @ApiProperty({ example: 199.99, description: 'Total amount of the order' })
  // @IsNumber({}, { message: 'Total amount must be a number' })
  // @Min(0, { message: 'Total amount must be at least 0' })
  // totalAmount: number;

}
