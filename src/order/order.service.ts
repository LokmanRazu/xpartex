
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { plainToInstance } from 'class-transformer';
import { OrderResponseDto } from './dto/order.response-dto';
import { CreateOrderDto } from './dto/order.request-dto';
import { UpdateOrderDto } from './dto/order.update-dto';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private productService: ProductService,
    private userservice: UserService

  ) { }

  async findAll(): Promise<OrderResponseDto[]> {
    try {
      console.log('hiiiiiiii')
      const orders = await this.orderRepository.find({ relations: ['product','user'] });
       console.log('orderrrrrr',orders)
      return plainToInstance(OrderResponseDto, orders, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch orders');
    }
  }

  async findOne(id: string): Promise<OrderResponseDto> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['items','product','user'],
      });
      if (!order) throw new NotFoundException('Order not found');

      return plainToInstance(OrderResponseDto, order, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch order');
    }
  }

  async create(dto: CreateOrderDto): Promise<OrderResponseDto> {
    try {
      const { productId, buyerId, status, totalAmount } = dto;
      const product = await this.productService.findOne(productId)
      if (!product) throw new NotFoundException('Product not found for given productId');
      const buyer = await this.userservice.findOne(buyerId)
      if (!buyer) throw new NotFoundException('Buyer not found for given productId');

      const order = this.orderRepository.create({
        product: { id: dto.productId } as Product,
        user: { id: dto.buyerId } as User,
        status,
        totalAmount
      });
      const savedOrder = await this.orderRepository.save(order);

      // Order items will be created by the OrderItemService

      return plainToInstance(OrderResponseDto, savedOrder, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async update(id: string, dto: UpdateOrderDto): Promise<OrderResponseDto> {
    try {
      const order = await this.orderRepository.findOne({ where: { id }, relations: ['items','buyer'] });
      if (!order) throw new NotFoundException('Order not found');

      if (dto.buyerId) {
        const buyer = await this.userservice.findOne(dto.buyerId)
        if (!buyer) throw new NotFoundException('buyer not found');
      }
      if(dto.productId){
        const product = await this.productService.findOne(dto.productId)
           if (!product) throw new NotFoundException('product not found');
      }

      Object.assign(order, dto);

      const updatedOrder = await this.orderRepository.save(order);

      return plainToInstance(OrderResponseDto, updatedOrder, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update order');
    }
  }

  async delete(id: string): Promise<OrderResponseDto> {
    try {
      const order = await this.orderRepository.findOne({ where: { id }, relations: ['items'] });
      if (!order) throw new NotFoundException('Order not found');

      await this.orderRepository.delete(id);

      return plainToInstance(OrderResponseDto, order, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete order');
    }
  }
}
