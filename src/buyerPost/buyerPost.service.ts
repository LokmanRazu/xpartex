import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Buyerpost } from './buyerPost.entity';
import { BuyerPostResponseDto } from './dto/buyerPost.response-dto';
import { CreateBuyerPostDto } from './dto/buyerPost.request-dto';
import { UpdateBuyerPostDto } from './dto/buyerPost.update-dto';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { uploadImageToCloudinary } from '../../utils/imageUpload';
import { UserService } from '../user/user.service';

@Injectable()
export class BuyerPostService {
  constructor(
    @InjectRepository(Buyerpost)
    private readonly buyerPostRepository: Repository<Buyerpost>,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService
  ) { }

  async findAll(): Promise<BuyerPostResponseDto[]> {
    try {
      const posts = await this.buyerPostRepository.find({ relations: ['user', 'category'] });
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
      const post = await this.buyerPostRepository.findOne({ where: { id }, relations: ['user', 'category', 'postBidOffers', 'postBidOffers.bidder'] });
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

  async findByUserId(userId: string): Promise<BuyerPostResponseDto[]> {
    try {
      const posts = await this.buyerPostRepository.find({ where: { user: { id: userId } }, relations: ['user', 'category', 'postBidOffers', 'postBidOffers.bidder'] });
      return plainToInstance(BuyerPostResponseDto, posts, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update buyer post');
    }
  }

async create(
  dto: CreateBuyerPostDto,
  file?: Express.Multer.File,

): Promise<BuyerPostResponseDto> {
  try {
    const {
      title,
      description,
      categoryId,
      userId,
      target_price,
      location,
      quantity,
      deadline,
      unit,
      status,
      attachment, // this will be replaced by uploaded file URL
    } = dto;

    // ----------------- Upload file -----------------
    let uploadedFile: any = null;
    if (file) {
      uploadedFile = await uploadImageToCloudinary(file.path);
    }

    // ----------------- Validate relations -----------------
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const category = await this.categoryService.findOne(categoryId);
    if (!category) throw new NotFoundException('Category not found');

    // ----------------- Create Buyer Post -----------------
    const post = this.buyerPostRepository.create({
      ...dto,
      attachment: uploadedFile?.secure_url, // <-- file URL
      user: { id: userId } as User,
      category: { id: categoryId } as Category,
    });

    const savedPost = await this.buyerPostRepository.save(post);

    return plainToInstance(BuyerPostResponseDto, savedPost, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  } catch (error) {
    throw new InternalServerErrorException(
      'Failed to create buyer post: ' + error.message,
    );
  }
}


  async update(id: string, dto: UpdateBuyerPostDto): Promise<BuyerPostResponseDto> {
    try {
      await this.buyerPostRepository.update(id, dto);
      const updatedPost = await this.buyerPostRepository.findOne({ where: { id }, relations: ['user', 'category'] });

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
      const post = await this.buyerPostRepository.findOne({ where: { id }, relations: ['user', 'category'] });
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
