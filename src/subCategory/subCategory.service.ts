import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { SubCategory } from './subCategory.entity';
import { SubCategoryResponseDto } from './dto/subCategory.response-dto';
import { CreateSubCategoryDto } from './dto/subCategory.request-dto';
import { UpdateSubCategoryDto } from './dto/subCategory.update-dto';
import { Category } from '../category/category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) { }

  async findAll(): Promise<SubCategoryResponseDto[]> {
    try {
      const subCategories = await this.subCategoryRepository.find({ relations: ['category'] });
      return plainToInstance(SubCategoryResponseDto, subCategories, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch sub categories');
    }
  }

  async findOne(id: string): Promise<SubCategoryResponseDto> {
    try {
      const subCategory = await this.subCategoryRepository.findOne({ where: { id }, relations: ['category'] });
      if (!subCategory) throw new NotFoundException('Sub category not found');

      return plainToInstance(SubCategoryResponseDto, subCategory, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch sub category');
    }
  }

  async create(dto: CreateSubCategoryDto): Promise<SubCategoryResponseDto> {
    try {
      const subCategory = this.subCategoryRepository.create({
        ...dto,
        category: { id: dto.categoryId } as Category,
      });
      const savedSubCategory = await this.subCategoryRepository.save(subCategory);

      return plainToInstance(SubCategoryResponseDto, savedSubCategory, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
        throw new InternalServerErrorException('Failed to create sub category');
    }
  }

  async update(id: string, dto: UpdateSubCategoryDto): Promise<SubCategoryResponseDto> {
    try {
      await this.subCategoryRepository.update(id, dto);
      const updatedSubCategory = await this.subCategoryRepository.findOne({ where: { id }, relations: ['category'] });

      if (!updatedSubCategory) throw new NotFoundException('Sub category not found after update');

      return plainToInstance(SubCategoryResponseDto, updatedSubCategory, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update sub category');
    }
  }

  async delete(id: string): Promise<SubCategoryResponseDto> {
    try {
      const subCategory = await this.subCategoryRepository.findOne({ where: { id }, relations: ['category'] });
      if (!subCategory) throw new NotFoundException('Sub category not found');

      await this.subCategoryRepository.delete(id);

      return plainToInstance(SubCategoryResponseDto, subCategory, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete sub category');
    }
  }
}
