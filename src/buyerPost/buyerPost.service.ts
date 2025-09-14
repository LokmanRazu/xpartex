import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { BuyerPost } from './buyerPost.entity';
import { BuyerPostResponseDto } from './dto/buyerPost.response-dto';
import { CreateBuyerPostDto } from './dto/buyerPost.request-dto';
import { UpdateBuyerPostDto } from './dto/buyerPost.update-dto';

@Injectable()
export class BuyerPostService {
  constructor(
    @InjectRepository(BuyerPost)
    private readonly buyerPostRepository: Repository<BuyerPost>,
  ) {}

  async findAll(): Promise<BuyerPostResponseDto[]> {
    try {
      const posts = await this.buyerPostRepository.find();
      return plainToInstance(BuyerPostResponseDto, posts, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch buyer posts');
    }
  }

  async findOne(id: string): Promise<BuyerPostResponseDto> {
    try {
      const post = await this.buyerPostRepository.findOne({ where: { id: Number(id) } });
      if (!post) throw new NotFoundException('Buyer post not found');

      return plainToInstance(BuyerPostResponseDto, post, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch buyer post');
    }
  }

  async create(dto: CreateBuyerPostDto): Promise<BuyerPostResponseDto> {
    try {
      const post = this.buyerPostRepository.create(dto);
      const savedPost = await this.buyerPostRepository.save(post);

      return plainToInstance(BuyerPostResponseDto, savedPost, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create buyer post');
    }
  }

  async update(id: string, dto: UpdateBuyerPostDto): Promise<BuyerPostResponseDto> {
    try {
      await this.buyerPostRepository.update(id, dto);
      const updatedPost = await this.buyerPostRepository.findOne({ where: { id: Number(id) } });

      if (!updatedPost) throw new NotFoundException('Buyer post not found after update');

      return plainToInstance(BuyerPostResponseDto, updatedPost, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update buyer post');
    }
  }

  async delete(id: string): Promise<BuyerPostResponseDto> {
    try {
      const post = await this.buyerPostRepository.findOne({ where: { id: Number(id) } });
      if (!post) throw new NotFoundException('Buyer post not found');

      await this.buyerPostRepository.delete(id);

      return plainToInstance(BuyerPostResponseDto, post, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete buyer post');
    }
  }
}
