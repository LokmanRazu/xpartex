import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostBidOffer } from './postBidOffer.entity';
import { PostBidOfferResponseDto } from './dto/postBidOffer.response-dto';
import { plainToInstance } from 'class-transformer';
import { PostBidOfferRequestDto } from './dto/postBidOffer.request-dto';
import { UpdatePostBidOfferDto } from './dto/postBidOffer.update-dto';
import { BuyerPostService } from '../buyerPost/buyerPost.service';
import { UserService } from '../user/user.service';
import { Buyerpost } from '../buyerPost/buyerPost.entity';
import { User } from '../user/user.entity';
import { uploadImageToCloudinary } from '../../utils/imageUpload';

@Injectable()
export class PostBidOfferService {
  constructor(
    @InjectRepository(PostBidOffer)
    private postBidOfferRepository: Repository<PostBidOffer>,
    private buyerPostService: BuyerPostService,
    private userService: UserService,
  ) { }

  async create(
    dto: PostBidOfferRequestDto,
    file?: Express.Multer.File,
  ): Promise<PostBidOfferResponseDto> {
    try {
      const { buyerPostId, bidderId, price, delivaryTime, shippingMetode, attachment } = dto;

      // ----------------- Upload file -----------------
      let uploadedFile: any = null;
      if (file) {
        uploadedFile = await uploadImageToCloudinary(file.path);
      }

      // ----------------- Validate relations -----------------
      const buyerPost = await this.buyerPostService.findOne(buyerPostId);
      if (!buyerPost) throw new NotFoundException('Buyer post not found');

      const bidder = await this.userService.findOne(bidderId);
      if (!bidder) throw new NotFoundException('Bidder not found');

      // ----------------- Create Post Bid Offer -----------------
      const postBidOffer = this.postBidOfferRepository.create({
        ...dto,
        attachment: uploadedFile?.secure_url, // ⬅️ file URL saved here
        buyerPost: { id: buyerPostId } as Buyerpost,
        bidder: { id: bidderId } as User,
      });

      const savedPostBidOffer = await this.postBidOfferRepository.save(postBidOffer);

      return plainToInstance(PostBidOfferResponseDto, savedPostBidOffer, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create post bid offer: ' + error.message,
      );
    }
  }




  async findAll(): Promise<PostBidOfferResponseDto[]> {
    try {
      const postBidOffers = await this.postBidOfferRepository.find({
        relations: ['buyerPost', 'bidder'],
      });
      return plainToInstance(PostBidOfferResponseDto, postBidOffers, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException(
        'Failed to fetch post bid offers',
      );
    }
  }

  async findOne(id: string): Promise<PostBidOfferResponseDto> {
    try {
      const postBidOffer = await this.postBidOfferRepository.findOne({
        where: { id },
        relations: ['buyerPost', 'bidder'],
      });
      if (!postBidOffer)
        throw new NotFoundException('Post bid offer not found');

      return plainToInstance(PostBidOfferResponseDto, postBidOffer, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch post bid offer');
    }
  }

  async findByBidderId(bidderId: string): Promise<PostBidOfferResponseDto[]> {
    try {
      const postBidOffers = await this.postBidOfferRepository.find({
        where: { bidder: { id: bidderId } },
        relations: ['buyerPost', 'bidder'],
      });
      return plainToInstance(PostBidOfferResponseDto, postBidOffers, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch post bid offer');
    }
  }

  async update(
    id: string,
    dto: UpdatePostBidOfferDto,
  ): Promise<PostBidOfferResponseDto> {
    try {
      const postBidOffer = await this.postBidOfferRepository.findOne({
        where: { id },
      });
      if (!postBidOffer)
        throw new NotFoundException('Post bid offer not found');

      Object.assign(postBidOffer, dto);

      const updatedPostBidOffer = await this.postBidOfferRepository.save(
        postBidOffer,
      );
      return plainToInstance(PostBidOfferResponseDto, updatedPostBidOffer, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update post bid offer');
    }
  }

  async delete(id: string): Promise<PostBidOfferResponseDto> {
    try {
      const postBidOffer = await this.postBidOfferRepository.findOne({
        where: { id },
      });
      if (!postBidOffer)
        throw new NotFoundException('Post bid offer not found');

      await this.postBidOfferRepository.delete(id);
      return plainToInstance(PostBidOfferResponseDto, postBidOffer, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete post bid offer');
    }
  }
}
