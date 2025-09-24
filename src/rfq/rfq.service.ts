import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Rfq } from './rfq.entity';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { RfqResponseDto } from './dto/rfq.response-dto';
import { CreateRfqDto } from './dto/rfq.request-dto';
import { UpdateRfqDto } from './dto/rfq.update-dto';

@Injectable()
export class RfqService {
  constructor(
    @InjectRepository(Rfq)
    private rfqRepository: Repository<Rfq>,
    private userService: UserService,
    private productService: ProductService,
  ) { }

  async findAll(): Promise<RfqResponseDto[]> {
    try {
      const rfqs = await this.rfqRepository.find({
        relations: ['buyer', 'product', 'product.seller'],
      });

      return plainToInstance(RfqResponseDto, rfqs, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch RFQs');
    }
  }

  async findOne(id: string): Promise<RfqResponseDto> {
    try {
      const rfq = await this.rfqRepository.findOne({
        where: { id },
        relations: ['buyer', 'product', 'product.seller'],
      });
      if (!rfq) throw new NotFoundException('RFQ not found');

      return plainToInstance(RfqResponseDto, rfq, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch RFQ');
    }
  }

  async create(dto: CreateRfqDto): Promise<RfqResponseDto> {
    try {
      const { title, quantity, unit, date, file, region, buyerId, productId,
        deliveryTerms, paymentTerms, warrantyPeriod, currency,
        shippingAddress, specialInstructions } = dto;

      const buyer = await this.userService.findOne(buyerId);
      if (!buyer) throw new NotFoundException('Buyer not found');

      const product = await this.productService.findOne(productId);
      if (!product) throw new NotFoundException('Product not found');

      const rfq = this.rfqRepository.create({
        title, quantity, unit, date, file, region,
        deliveryTerms, paymentTerms, warrantyPeriod, currency,
        shippingAddress, specialInstructions,
        buyer: { id: buyerId } as User,
        product: { id: productId } as Product,
      });

      const savedRfq = await this.rfqRepository.save(rfq);

      return plainToInstance(RfqResponseDto, savedRfq, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create RFQ');
    }
  }

  async update(id: string, dto: UpdateRfqDto): Promise<RfqResponseDto> {
    try {
      const rfq = await this.rfqRepository.findOne({
        where: { id },
        relations: ['buyer', 'product'],
      });
      if (!rfq) throw new NotFoundException('RFQ not found');

      if (dto.buyerId) {
        const buyer = await this.userService.findOne(dto.buyerId);
        if (!buyer) throw new NotFoundException('Buyer not found');
        rfq.buyer = { id: dto.buyerId } as User;
      }

      if (dto.productId) {
        const product = await this.productService.findOne(dto.productId);
        if (!product) throw new NotFoundException('Product not found');
        rfq.product = { id: dto.productId } as Product;
      }

      Object.assign(rfq, { ...dto, buyerId: undefined, productId: undefined });

      const updatedRfq = await this.rfqRepository.save(rfq);

      return plainToInstance(RfqResponseDto, updatedRfq, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update RFQ');
    }
  }

  async delete(id: string): Promise<RfqResponseDto> {
    try {
      const rfq = await this.rfqRepository.findOne({ where: { id } });
      if (!rfq) throw new NotFoundException('RFQ not found');

      await this.rfqRepository.delete(id);

      return plainToInstance(RfqResponseDto, rfq, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete RFQ');
    }
  }
}
