import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OrderResponseDto } from '../../order/dto/order.response-dto';
import { PaymentStatus } from '../payment.entity';

export class PaymentResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: () => OrderResponseDto })
  @Expose()
  @Type(() => OrderResponseDto)
  order: OrderResponseDto;

  @ApiProperty()
  @Expose()
  amount: number;

  @ApiProperty({ enum: PaymentStatus })
  @Expose()
  status: PaymentStatus;

  @ApiProperty()
  @Expose()
  paymentMethod: string;
}
