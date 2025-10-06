import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class PaymentRequestDto {
  @ApiProperty({
    example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab',
    description: 'Order linked to this payment',
  })
  @IsUUID('4', { message: 'orderId must be a valid UUID' })
  @IsNotEmpty({ message: 'orderId is required' })
  orderId: string;

  @ApiProperty({
    example: 100.5,
    description: 'Payment amount',
  })
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @ApiProperty({
    example: 'credit_card',
    description: 'Payment method',
  })
  @IsString({ message: 'Payment method must be a string' })
  @IsNotEmpty({ message: 'Payment method is required' })
  paymentMethod: string;
}
