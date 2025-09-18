import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from './dto/category.response-dto';
import { CreateCategoryDto } from './dto/category.request-dto';
import { UpdateCategoryDto } from './dto/category.update-dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<CategoryResponseDto[]> {
    try {
      const categories = await this.categoryRepository.find();
      return plainToInstance(CategoryResponseDto, categories, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) throw new NotFoundException('Category not found');
      return plainToInstance(CategoryResponseDto, category, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch category');
    }
  }

  async create(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    try {
      const category = this.categoryRepository.create(dto);
      const savedCategory = await this.categoryRepository.save(category);
      return plainToInstance(CategoryResponseDto, savedCategory, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) throw new NotFoundException('Category not found');

      Object.assign(category, dto);
      const updatedCategory = await this.categoryRepository.save(category);
      return plainToInstance(CategoryResponseDto, updatedCategory, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update category');
    }
  }

  async delete(id: string): Promise<CategoryResponseDto> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) throw new NotFoundException('Category not found');

      await this.categoryRepository.delete(id);
      return plainToInstance(CategoryResponseDto, category, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete category');
    }
  }
}
