import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    Inject,
    forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, productType } from './product.entity';
import { ProductResponseDto } from './dto/product.response-dto';
import { plainToInstance } from 'class-transformer';
import { UpdateProductDto } from './dto/product.update-dto';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/category.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { WholesaleService } from 'src/wholesale/wholesale.service';
import { Wholesale } from 'src/wholesale/wholesale.entity';
import { B2b } from 'src/b2b/b2b.entity';
import { Retail } from 'src/retail/retail.entity';
import { CreateProductDto } from './dto/product.request-dto';
import { uploadImageToCloudinary } from 'utils/imageUpload';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Wholesale)
        private wholesaleRepository: Repository<Wholesale>,
        @InjectRepository(B2b)
        private b2bRepository: Repository<B2b>,
        @InjectRepository(Retail)
        private retailRepository: Repository<Retail>,
        private categoryService: CategoryService,
        private userService: UserService,
    ) { }

    async findAll(): Promise<ProductResponseDto[]> {
        try {
            const products = await this.productRepository.find({
                relations: ['category', 'seller', 'b2bs', 'wholesales', 'retails'],
            });
            return plainToInstance(ProductResponseDto, products, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch {
            throw new InternalServerErrorException('Failed to fetch products');
        }
    }

    async findAllByUser(id: string): Promise<ProductResponseDto[]> {
        try {
            console.log('iddddddd===', id)
            const products = await this.productRepository.find({
                where: { seller: { id } },
                relations: ['category', 'seller', 'b2bs', 'wholesales', 'retails'],
            });
            return plainToInstance(ProductResponseDto, products, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch {
            throw new InternalServerErrorException('Failed to fetch products');
        }
    }

    async findOne(id: string): Promise<ProductResponseDto> {
        try {
            const product = await this.productRepository.findOne({ where: { id }, relations: ['category', 'seller', 'b2bs', 'wholesales', 'retails'] });
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

    async create(
        dto: CreateProductDto,
        files: { img?: Express.Multer.File[]; additionalImages?: Express.Multer.File[] },
    ): Promise<ProductResponseDto> {
        try {
            const {
                name,
                sellerId,
                categoryId,
                price,
                stockQuantity,
                productDescription,
                productType,
                description,
                size,
                moq,
                tags,
                weight,
                deliveryOptions,
                discountPrice,
                colorVariants,
                returnPolicy,
                packagingDetails,
                leadTime,
                negotiablePrice,
                sampleAvailability,
                customBiddingOption,
                // ✅ New fields
                productSubCategory,
                hsnCode,
                skuCode,
                materialType,
                composition,
                gsm,
                yarnCount,
                pattern,
                certifications,
                unitOfMeasurement,
                availableQuantity,
                manufacturer,
                originCountry,
                productionCapacity,
            } = dto;

            // ----------------- Image Upload -----------------
            let uploadedMain: any = null;
            if (files.img && files.img[0]) {
                uploadedMain = await uploadImageToCloudinary(files.img[0].path);
            }

            let uploadedAdditional: string[] = [];
            if (files.additionalImages && files.additionalImages.length > 0) {
                const results = await Promise.all(
                    files.additionalImages.map(async (file) => {
                        const res = await uploadImageToCloudinary(file.path);
                        return res?.secure_url;
                    }),
                );
                uploadedAdditional = results.filter((url): url is string => !!url);
            }

            // ----------------- Validate Relations -----------------
            const seller = await this.userService.findOne(sellerId);
            if (!seller) throw new NotFoundException('Seller not found');

            const category = await this.categoryService.findOne(categoryId);
            if (!category) throw new NotFoundException('Category not found');

            // ----------------- Create Product -----------------
            const product = this.productRepository.create({
                name,
                img: uploadedMain?.secure_url,
                seller: { id: sellerId } as User,
                category: { id: categoryId } as Category,
                price,
                stockQuantity,
                productDescription,
                productType,
                additionalImages: uploadedAdditional,
                tags,
                weight,
                deliveryOptions,
                discountPrice,
                colorVariants,
                returnPolicy,
                packagingDetails,
                leadTime,
                negotiablePrice,
                sampleAvailability,
                customBiddingOption,

                // ✅ New fields mapping
                productSubCategory,
                hsnCode,
                skuCode,
                materialType,
                composition,
                gsm,
                yarnCount,
                pattern,
                certifications,
                unitOfMeasurement,
                availableQuantity,
                manufacturer,
                originCountry,
                productionCapacity,
            });

            const savedProduct = await this.productRepository.save(product);

            // ----------------- Handle Product Type Relations -----------------
            if (productType === 'wholesale') {
                const wholesale = this.wholesaleRepository.create({
                    product: { id: savedProduct.id } as Product,
                    description,
                    size,
                    moq,
                });
                await this.wholesaleRepository.save(wholesale);
            } else if (productType === 'b2b') {
                const b2b = this.b2bRepository.create({
                    product: { id: savedProduct.id } as Product,
                    description,
                    size,
                    moq,
                });
                await this.b2bRepository.save(b2b);
            } else if (productType === 'retail') {
                const retail = this.retailRepository.create({
                    product: { id: savedProduct.id } as Product,
                    size,
                });
                await this.retailRepository.save(retail);
            }

            // ----------------- Response -----------------
            return plainToInstance(ProductResponseDto, savedProduct, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to create product: ' + error.message,
            );
        }
    }







    async update(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
        try {
            const product = await this.productRepository.findOne({
                where: { id },
                relations: ['category'],
            });
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
