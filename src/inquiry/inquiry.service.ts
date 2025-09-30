import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './inquiry.entity';
import { InquiryResponseDto } from './dto/inquiry.response-dto';
import { plainToInstance } from 'class-transformer';
import { InquiryRequestDto } from './dto/inquiry.request-dto';
import { UpdateInquiryDto } from './dto/inquiry.update-dto';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
    private productService: ProductService,
  ) { }

  async create(dto: InquiryRequestDto): Promise<InquiryResponseDto> {
    try {
      const product = await this.productService.findOne(dto.productId);
      if (!product) throw new NotFoundException('Product not found');

      const inquiry = this.inquiryRepository.create({
        ...dto,
        product: { id: dto.productId } as Product,
        buyer: { id: dto.buyerId } as User
      });

      const savedInquiry = await this.inquiryRepository.save(inquiry);

      return plainToInstance(InquiryResponseDto, savedInquiry, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create inquiry: ' + error.message,
      );
    }
  }

  async findAll(): Promise<InquiryResponseDto[]> {
    try {
      const inquiries = await this.inquiryRepository.find({
        relations: ['product', 'product.seller', 'buyer'],
      });
      return plainToInstance(InquiryResponseDto, inquiries, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch inquiries');
    }
  }

  async findOne(id: string): Promise<InquiryResponseDto> {
    try {
      const inquiry = await this.inquiryRepository.findOne({
        where: { id },
        relations: ['product', 'product.seller', 'buyer'],
      });
      if (!inquiry) throw new NotFoundException('Inquiry not found');

      return plainToInstance(InquiryResponseDto, inquiry, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch inquiry');
    }
  }

  async findBySellerId(sellerId: string): Promise<InquiryResponseDto[]> {
    try {
      const inquiries = await this.inquiryRepository.find({
        where: { product: { seller: { id: sellerId } } },
        relations: ['product', 'product.seller', 'buyer'],
      });

      if (inquiries.length === 0) {
        throw new NotFoundException('Inquiry not found');
      }

      return plainToInstance(InquiryResponseDto, inquiries, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new InternalServerErrorException('Failed to fetch inquiries');
    }
  }


  async findByBuyerId(buyerId: string): Promise<InquiryResponseDto[]> {
    try {
      const inquiries = await this.inquiryRepository.find({
        where: { buyer: { id: buyerId } },
        relations: ['product', 'product.seller', 'buyer'],
      });

      if (inquiries.length === 0) {
        throw new NotFoundException('Inquiry not found');
      }

      return plainToInstance(InquiryResponseDto, inquiries, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // rethrow original (e.g., NotFoundException)
      }
      throw new InternalServerErrorException('Failed to fetch inquiries');
    }
  }


  async update(id: string, dto: UpdateInquiryDto): Promise<InquiryResponseDto> {
    try {
      const inquiry = await this.inquiryRepository.findOne({ where: { id } });
      if (!inquiry) throw new NotFoundException('Inquiry not found');

      Object.assign(inquiry, dto);

      const updatedInquiry = await this.inquiryRepository.save(inquiry);
      return plainToInstance(InquiryResponseDto, updatedInquiry, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update inquiry');
    }
  }

  async delete(id: string): Promise<InquiryResponseDto> {
    try {
      const inquiry = await this.inquiryRepository.findOne({ where: { id } });
      if (!inquiry) throw new NotFoundException('Inquiry not found');

      await this.inquiryRepository.delete(id);
      return plainToInstance(InquiryResponseDto, inquiry, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete inquiry');
    }
  }
}