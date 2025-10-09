import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    Inject,
    forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductResponseDto } from './dto/product.response-dto';
import { plainToInstance } from 'class-transformer';
import { UpdateProductDto } from './dto/product.update-dto';
import { Category } from '../category/category.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Wholesale } from '../wholesale/wholesale.entity';
import { B2b } from '../b2b/b2b.entity';
import { Retail } from '../retail/retail.entity';
import { CreateProductDto } from './dto/product.request-dto';
import { uploadImageToCloudinary } from '../../utils/imageUpload';
import { CategoryService } from '../category/category.service';
import { CompanyProfile } from '../companyProfile/companyProfile.entity';
import { CompanyProfileService } from '../companyProfile/companyProfile.service';
import { SubCategoryService } from '../subCategory/subCategory.service';
import { SubCategory } from '../subCategory/subCategory.entity';

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
        private companyProfileService: CompanyProfileService,
        private subCategoryService: SubCategoryService,
    ) { }

    async findAll(): Promise<ProductResponseDto[]> {
        try {
            const products = await this.productRepository.find({
                relations: ['category', 'seller', 'b2bs', 'wholesales', 'retails', 'inquiries', 'company', 'subCategory'],
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
                relations: ['category', 'seller', 'b2bs', 'wholesales', 'retails', 'company', 'subCategory'],
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
            const product = await this.productRepository.findOne({ where: { id }, relations: ['category', 'seller', 'b2bs', 'wholesales', 'retails', 'cart', 'company', 'subCategory'] });
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
                title, sellerId, companyProfileId, categoryId, subCategoryId, video, price, img, additional_images, hs_code, tags,
                brand_name, description, key_features, origin_country, certifications, material_type, usage_application,
                price_unit, payment_terms, packaging_details, delivery_terms, trade_terms, return_policy, warranty,
                stock_quantity, colorVariants, available_sizes, price_per_unit, shipping_cost, shipping_methods, port_of_shipment, shipping_time, tier_pricing, is_active,
                is_b2b, is_wholesale, is_retail, moq, sample_availability, supply_ability, sample_cost, lead_time, customization_availability, customization_type
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

            const companyProfile = await this.companyProfileService.findOne(companyProfileId);
            if (!companyProfile) throw new NotFoundException('Company profile not found');

            const subCategory = await this.subCategoryService.findOne(subCategoryId);
            if (!subCategory) throw new NotFoundException('Sub category not found');

            // ----------------- Create Product -----------------
            const product = this.productRepository.create({
                title,
                img: uploadedMain?.secure_url,
                seller: { id: sellerId } as User,
                company: { id: companyProfileId } as CompanyProfile,
                category: { id: categoryId } as Category,
                subCategory: { id: subCategoryId } as SubCategory,
                additional_images: uploadedAdditional,
                ...dto,


            });

            const savedProduct = await this.productRepository.save(product);

            // ----------------- Handle Product Type Relations -----------------
            // if (listing_type === 'wholesale') {
            //     const wholesale = this.wholesaleRepository.create({
            //         product: { id: savedProduct.id } as Product,
            //         moq,
            //     });
            //     await this.wholesaleRepository.save(wholesale);
            // } else if (listing_type === 'b2b') {
            //     const b2b = this.b2bRepository.create({
            //         product: { id: savedProduct.id } as Product,
            //         moq,
            //     });
            //     await this.b2bRepository.save(b2b);
            // } else if (listing_type === 'retail') {
            //     const retail = this.retailRepository.create({
            //         product: { id: savedProduct.id } as Product,
            //     });
            //     await this.retailRepository.save(retail);
            // }

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
