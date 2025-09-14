import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductResponseDto } from './dto/product.response-dto';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/product.request-dto';
import { UpdateProductDto } from './dto/product.update-dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<ProductResponseDto[]> {
        try {
            const products = await this.productRepository.find();
            return plainToInstance(ProductResponseDto, products, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch products');
        }
    }

    async findOne(id: string): Promise<ProductResponseDto> {
        try {
            const product = await this.productRepository.findOne({ where: { id } });
            if (!product) throw new NotFoundException('Product not found');

            return plainToInstance(ProductResponseDto, product, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to fetch product');
        }
    }

    async create(dto: CreateProductDto): Promise<ProductResponseDto> {
        try {
            const product = this.productRepository.create(dto);
            const savedProduct = await this.productRepository.save(product);

            return plainToInstance(ProductResponseDto, savedProduct, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to create product');
        }
    }

    async update(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
        try {
            await this.productRepository.update(id, dto);
            const updatedProduct = await this.productRepository.findOne({ where: { id } });

            if (!updatedProduct) throw new NotFoundException('Product not found after update');

            return plainToInstance(ProductResponseDto, updatedProduct, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to update product');
        }
    }

    async delete(id: string): Promise<ProductResponseDto> {
        try {
            const product = await this.productRepository.findOne({ where: { id } });
            if (!product) throw new NotFoundException('Product not found');

            await this.productRepository.delete(id);

            return plainToInstance(ProductResponseDto, product, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to delete product');
        }
    }
}
