import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { PaymentResponseDto } from './dto/payment.response-dto';
import { plainToInstance } from 'class-transformer';
import { PaymentRequestDto } from './dto/payment.request-dto';
import { UpdatePaymentDto } from './dto/payment.update-dto';
import { OrderService } from '../order/order.service';
import { Order } from '../order/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private orderService: OrderService,
  ) {}

  async create(dto: PaymentRequestDto): Promise<PaymentResponseDto> {
    try {
      const order = await this.orderService.findOne(dto.orderId);
      if (!order) throw new NotFoundException('Order not found');

      const payment = this.paymentRepository.create({
        ...dto,
        order: { id: dto.orderId } as Order,
      });

      const savedPayment = await this.paymentRepository.save(payment);

      return plainToInstance(PaymentResponseDto, savedPayment, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create payment: ' + error.message,
      );
    }
  }

  async findAll(): Promise<PaymentResponseDto[]> {
    try {
      const payments = await this.paymentRepository.find({
        relations: ['order'],
      });
      return plainToInstance(PaymentResponseDto, payments, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch payments');
    }
  }

  async findOne(id: string): Promise<PaymentResponseDto> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { id },
        relations: ['order'],
      });
      if (!payment) throw new NotFoundException('Payment not found');

      return plainToInstance(PaymentResponseDto, payment, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch payment');
    }
  }

  async update(id: string, dto: UpdatePaymentDto): Promise<PaymentResponseDto> {
    try {
      const payment = await this.paymentRepository.findOne({ where: { id } });
      if (!payment) throw new NotFoundException('Payment not found');

      Object.assign(payment, dto);

      const updatedPayment = await this.paymentRepository.save(payment);
      return plainToInstance(PaymentResponseDto, updatedPayment, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update payment');
    }
  }

  async delete(id: string): Promise<PaymentResponseDto> {
    try {
      const payment = await this.paymentRepository.findOne({ where: { id } });
      if (!payment) throw new NotFoundException('Payment not found');

      await this.paymentRepository.delete(id);
      return plainToInstance(PaymentResponseDto, payment, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete payment');
    }
  }
}
