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
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/category.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private categoryService: CategoryService
    ) { }

    async findAll(): Promise<ProductResponseDto[]> {
        try {
            const products = await this.productRepository.find({ relations: ['category'] });
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

            const { name, img, sellerId, categoryId, price, stockQuantity, description } = dto
            const category = await this.categoryService.findOne(categoryId)
            if (!category) throw new NotFoundException('categoey not found')
            const product = this.productRepository.create({
                name,
                img,
                sellerId,
                category: { id: categoryId } as Category,
                price,
                stockQuantity,
                description
            });
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
            const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
            if (!product) throw new NotFoundException('Product not found');

            if (dto.categoryId) {
                const category = await this.categoryService.findOne(dto.categoryId);
                if (!category) throw new NotFoundException('Category not found');
                product.category = { id: dto.categoryId } as Category;
            }

    
            Object.assign(product, { ...dto, categoryId: undefined }); 

            const updatedProduct = await this.productRepository.save(product);

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
