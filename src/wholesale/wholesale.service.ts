import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wholesale } from './wholesale.entity';
import { plainToInstance } from 'class-transformer';
import { WholesaleResponseDto } from './dto/wholesale.response-dto';
import { UpdateWholesaleDto } from './dto/wholesale.update-dto';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { CreateWholesaleDto } from './dto/wholesale.request-dto';

@Injectable()
export class WholesaleService {
  constructor(
    @InjectRepository(Wholesale)
    private wholesaleRepository: Repository<Wholesale>,
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  async findAll(): Promise<WholesaleResponseDto[]> {
    try {
      const wholesales = await this.wholesaleRepository.find({
        relations: ['product'],
      });

      return plainToInstance(WholesaleResponseDto, wholesales, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch wholesales');
    }
  }

  async findOne(id: string): Promise<WholesaleResponseDto> {
    try {
      const wholesale = await this.wholesaleRepository.findOne({
        where: { id },
        relations: ['product'],
      });
      if (!wholesale) throw new NotFoundException('Wholesale not found');

      return plainToInstance(WholesaleResponseDto, wholesale, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch wholesale');
    }
  }

  async create(dto: CreateWholesaleDto): Promise<WholesaleResponseDto> {
    try {
      const { description, size, moq, productId } = dto;

      const product = await this.productService.findOne(productId);
      if (!product) throw new NotFoundException('Product not found for given productId');

      const wholesale = this.wholesaleRepository.create({
        description,
        size,
        moq,
        product: { id: productId } as Product,
      });

      const savedWholesale = await this.wholesaleRepository.save(wholesale);

      return plainToInstance(WholesaleResponseDto, savedWholesale, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to create wholesale');
    }
  }

  async update(id: string, dto: UpdateWholesaleDto): Promise<WholesaleResponseDto> {
    try {
      const wholesale = await this.wholesaleRepository.findOne({
        where: { id },
        relations: ['product'],
      });
      if (!wholesale) throw new NotFoundException('Wholesale not found');

      if (dto.productId) {
        const product = await this.productService.findOne(dto.productId);
        if (!product) throw new NotFoundException('Product not found for given productId');
        wholesale.product = { id: dto.productId } as Product;
      }

      Object.assign(wholesale, dto);
      const updatedWholesale = await this.wholesaleRepository.save(wholesale);

      return plainToInstance(WholesaleResponseDto, updatedWholesale, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update wholesale');
    }
  }

  async delete(id: string): Promise<WholesaleResponseDto> {
    try {
      const wholesale = await this.wholesaleRepository.findOne({
        where: { id },
        relations: ['product'],
      });
      if (!wholesale) throw new NotFoundException('Wholesale not found');

      await this.wholesaleRepository.delete(id);

      return plainToInstance(WholesaleResponseDto, wholesale, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete wholesale');
    }
  }
}
