
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { plainToInstance } from 'class-transformer';
import { OrderItemResponseDto } from './dto/orderItem.response-dto';
import { CreateOrderItemDto } from './dto/orderItem.request-dto';
import { UpdateOrderItemDto } from './dto/orderItem.update-dto';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private orderService: OrderService,
    private productService: ProductService,
  ) {}

  async findAll(): Promise<OrderItemResponseDto[]> {
    try {
      const orderItems = await this.orderItemRepository.find({ relations: ['order'] });
      return plainToInstance(OrderItemResponseDto, orderItems, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch order items');
    }
  }

  async findOne(id: string): Promise<OrderItemResponseDto> {
    try {
      const orderItem = await this.orderItemRepository.findOne({
        where: { id },
        relations: ['order'],
      });
      if (!orderItem) throw new NotFoundException('Order item not found');

      return plainToInstance(OrderItemResponseDto, orderItem, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch order item');
    }
  }

  async create(dto: CreateOrderItemDto): Promise<OrderItemResponseDto> {
    try {
      const { orderId, productId, quantity, price, total } = dto;

      const order = await this.orderService.findOne(orderId);
      if (!order) throw new NotFoundException('Order not found for given orderId');

      const product = await this.productService.findOne(String(productId));
      if (!product) throw new NotFoundException('Product not found for given productId');

      const orderItem = this.orderItemRepository.create({
        order: { id: dto.orderId } as Order,
        product:{ id: dto.productId } as Product, 
        quantity,
        price,
        total,
      });

      const savedOrderItem = await this.orderItemRepository.save(orderItem);

      return plainToInstance(OrderItemResponseDto, savedOrderItem, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
        console.log(error)
      throw new InternalServerErrorException('Failed to create order item');
    }
  }

  async update(id: string, dto: UpdateOrderItemDto): Promise<OrderItemResponseDto> {
    try {
      const orderItem = await this.orderItemRepository.findOne({ where: { id }, relations: ['order'] });
      if (!orderItem) throw new NotFoundException('Order item not found');

      if (dto.orderId) {
        const order = await this.orderService.findOne(dto.orderId);
        if (!order) throw new NotFoundException('Order not found for given orderId');
        orderItem.order = { id: dto.orderId } as Order;
      }

      if (dto.productId) {
        const product = await this.productService.findOne(String(dto.productId));
        if (!product) throw new NotFoundException('Product not found for given productId');
        orderItem.product = {id: dto.productId} as Product
      }

      Object.assign(orderItem, dto);
      const updatedOrderItem = await this.orderItemRepository.save(orderItem);

      return plainToInstance(OrderItemResponseDto, updatedOrderItem, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update order item');
    }
  }

  async delete(id: string): Promise<OrderItemResponseDto> {
    try {
      const orderItem = await this.orderItemRepository.findOne({ where: { id }, relations: ['order'] });
      if (!orderItem) throw new NotFoundException('Order item not found');

      await this.orderItemRepository.delete(id);

      return plainToInstance(OrderItemResponseDto, orderItem, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete order item');
    }
  }
}
