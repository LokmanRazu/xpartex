// retail.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Retail } from './retail.entity';
import { plainToInstance } from 'class-transformer';
import { RetailResponseDto } from './dto/retail.response-dto';
import { CreateRetailDto } from './dto/retail.request-dto';
import { UpdateRetailDto } from './dto/retail.update-dto';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class RetailService {
  constructor(
    @InjectRepository(Retail)
    private retailRepository: Repository<Retail>, private productService:ProductService
  ) {}

  async findAll(): Promise<RetailResponseDto[]> {
    try {
      const retails = await this.retailRepository.find({ relations: ['product'] });

      return plainToInstance(RetailResponseDto, retails, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch retails');
    }
  }

  async findOne(id: string): Promise<RetailResponseDto> {
    try {
      const retail = await this.retailRepository.findOne({
        where: { id },
        relations: ['product'],
      });
      if (!retail) throw new NotFoundException('Retail not found');

      return plainToInstance(RetailResponseDto, retail, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true, 
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch retail');
    }
  }

  async create(dto: CreateRetailDto): Promise<RetailResponseDto> {
    try {
      const { name, description, size, moq, productId } = dto;

      const product = await this.productService.findOne(productId);
      if (!product) throw new NotFoundException('Product not found for given productId');

      const retail = this.retailRepository.create({
        name,
        description,
        size,
        moq,
        product:{ id: dto.productId } as Product, 
      });

      const savedRetail = await this.retailRepository.save(retail);

      return plainToInstance(RetailResponseDto, savedRetail, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to create retail');
    }
  }

  async update(id: string, dto: UpdateRetailDto): Promise<RetailResponseDto> {
    try {
      const retail = await this.retailRepository.findOne({ where: { id }, relations: ['product'] });
      if (!retail) throw new NotFoundException('Retail not found');

      if (dto.productId) {
        const product = await this.productService.findOne(dto.productId);
        if (!product) throw new NotFoundException('Product not found for given productId');
        retail.product = { id: dto.productId } as Product;
      }

      Object.assign(retail, dto);
      const updatedRetail = await this.retailRepository.save(retail);

      return plainToInstance(RetailResponseDto, updatedRetail, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update retail');
    }
  }

  async delete(id: string): Promise<RetailResponseDto> {
    try {
      const retail = await this.retailRepository.findOne({ where: { id }, relations: ['product'] });
      if (!retail) throw new NotFoundException('Retail not found');

      await this.retailRepository.delete(id);

      return plainToInstance(RetailResponseDto, retail, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete retail');
    }
  }
}
