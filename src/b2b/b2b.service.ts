// b2b.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B2b } from './b2b.entity';
import { plainToInstance } from 'class-transformer';
import { B2bResponseDto } from './dto/b2b.response-dto';
import { CreateB2bDto } from './dto/b2b.request-dto';
import { UpdateB2bDto } from './dto/b2b.update-dto';
import { Product } from '../product/product.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class B2bService {
  constructor(
    @InjectRepository(B2b)
    private b2bRepository: Repository<B2b>, private productService:ProductService
  ) {}

  async findAll(): Promise<B2bResponseDto[]> {
    try {
      const b2bs = await this.b2bRepository.find({ relations: ['product'] });

      return plainToInstance(B2bResponseDto, b2bs, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch b2bs');
    }
  }

  async findOne(id: string): Promise<B2bResponseDto> {
    try {
      const b2b = await this.b2bRepository.findOne({
        where: { id },
        relations: ['product'],
      });
      if (!b2b) throw new NotFoundException('B2b not found');

      return plainToInstance(B2bResponseDto, b2b, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true, 
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch b2b');
    }
  }

  async create(dto: CreateB2bDto): Promise<B2bResponseDto> {
    try {
      const {  description, size, moq, productId } = dto;

      const product = await this.productService.findOne(productId);
      if (!product) throw new NotFoundException('Product not found for given productId');

      const b2b = this.b2bRepository.create({
        description,
        size,
        moq,
        product:{ id: dto.productId } as Product, 
      });

      const savedB2b = await this.b2bRepository.save(b2b);

      return plainToInstance(B2bResponseDto, savedB2b, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to create b2b');
    }
  }

  async update(id: string, dto: UpdateB2bDto): Promise<B2bResponseDto> {
    try {
      const b2b = await this.b2bRepository.findOne({ where: { id }, relations: ['product'] });
      if (!b2b) throw new NotFoundException('B2b not found');

      if (dto.productId) {
        const product = await this.productService.findOne(dto.productId);
        if (!product) throw new NotFoundException('Product not found for given productId');
        b2b.product = { id: dto.productId } as Product;
      }

      Object.assign(b2b, dto);
      const updatedB2b = await this.b2bRepository.save(b2b);

      return plainToInstance(B2bResponseDto, updatedB2b, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update b2b');
    }
  }

  async delete(id: string): Promise<B2bResponseDto> {
    try {
      const b2b = await this.b2bRepository.findOne({ where: { id }, relations: ['product'] });
      if (!b2b) throw new NotFoundException('B2b not found');

      await this.b2bRepository.delete(id);

      return plainToInstance(B2bResponseDto, b2b, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete b2b');
    }
  }
}
