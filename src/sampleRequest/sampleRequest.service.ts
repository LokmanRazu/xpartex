import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleRequest } from './sampleRequest.entity';
import { SampleRequestResponseDto } from './dto/sampleRequest.response-dto';
import { plainToInstance } from 'class-transformer';
import { SampleRequestRequestDto } from './dto/sampleRequest.request-dto';
import { UpdateSampleRequestDto } from './dto/sampleRequest.update-dto';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Injectable()
export class SampleRequestService {
    constructor(
        @InjectRepository(SampleRequest)
        private sampleRequestRepository: Repository<SampleRequest>,
        private productService: ProductService,
    ) { }

    async create(dto: SampleRequestRequestDto): Promise<SampleRequestResponseDto> {
        try {
            const product = await this.productService.findOne(dto.productId);
            if (!product) throw new NotFoundException('Product not found');

            const sampleRequest = this.sampleRequestRepository.create({
                ...dto,
                buyer: { id: dto.buyerId } as User,
                product: { id: dto.productId } as Product,
                
            });

            const savedSampleRequest = await this.sampleRequestRepository.save(sampleRequest);

            return plainToInstance(SampleRequestResponseDto, savedSampleRequest, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to create sample request: ' + error.message,
            );
        }
    }

    async findAll(): Promise<SampleRequestResponseDto[]> {
        try {
            const sampleRequests = await this.sampleRequestRepository.find({
                relations: ['product', 'product.seller','buyer'],
            });
            return plainToInstance(SampleRequestResponseDto, sampleRequests, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch {
            throw new InternalServerErrorException('Failed to fetch sample requests');
        }
    }

    async findOne(id: string): Promise<SampleRequestResponseDto> {
        try {
            const sampleRequest = await this.sampleRequestRepository.findOne({
                where: { id },
                relations: ['product', 'product.seller','buyer'],
            });
            if (!sampleRequest) throw new NotFoundException('Sample request not found');

            return plainToInstance(SampleRequestResponseDto, sampleRequest, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to fetch sample request');
        }
    }

    async update(id: string, dto: UpdateSampleRequestDto): Promise<SampleRequestResponseDto> {
        try {
            const sampleRequest = await this.sampleRequestRepository.findOne({ where: { id }, relations: ['product', 'product.seller','buyer'] });
            if (!sampleRequest) throw new NotFoundException('Sample request not found');
            if (dto.productId) {
                const product = await this.productService.findOne(dto.productId);
                if (!product) throw new NotFoundException('Category not found');
                sampleRequest.product = { id: dto.productId } as Product;
            }

            Object.assign(sampleRequest, dto);

            const updatedSampleRequest = await this.sampleRequestRepository.save(sampleRequest);
            return plainToInstance(SampleRequestResponseDto, updatedSampleRequest, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to update sample request');
        }
    }

    async delete(id: string): Promise<SampleRequestResponseDto> {
        try {
            const sampleRequest = await this.sampleRequestRepository.findOne({ where: { id } });
            if (!sampleRequest) throw new NotFoundException('Sample request not found');

            await this.sampleRequestRepository.delete(id);
            return plainToInstance(SampleRequestResponseDto, sampleRequest, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to delete sample request');
        }
    }
}
