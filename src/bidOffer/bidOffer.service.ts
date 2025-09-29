import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RfqService } from '../rfq/rfq.service';
import { BidOffer } from './bidOffer.entity';
import { BidOfferResponseDto } from './dto/bidOffer.response-dto';
import { plainToInstance } from 'class-transformer';
import { CreateBidDto } from './dto/bidOffer.request-dto';
import { UpdateBidOfferDto } from './dto/bidOffer.update-dto';

@Injectable()
export class BidOfferService {
    constructor(
        @InjectRepository(BidOffer)
        private bidRepository: Repository<BidOffer>,
        private userService: UserService,
        private rfqService: RfqService,
    ) { }

    async findAll(): Promise<BidOfferResponseDto[]> {
        try {
            const bids = await this.bidRepository.find({
                relations: ['rfq', 'seller'],
            });
            return plainToInstance(BidOfferResponseDto, bids, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch {
            throw new InternalServerErrorException('Failed to fetch bids');
        }
    }

    async findBySeller(sellerId: string): Promise<BidOfferResponseDto[]> {
        try {
            const bids = await this.bidRepository.find({
                where: { seller: { id: sellerId } },
                relations: ['rfq', 'seller'],
            });
            return plainToInstance(BidOfferResponseDto, bids, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch {
            throw new InternalServerErrorException('Failed to fetch seller bids');
        }
    }

    async findByRfq(rfqId: string): Promise<BidOfferResponseDto[]> {
        try {
            const bids = await this.bidRepository.find({
                where: { rfq: { id: rfqId } },
                relations: ['rfq', 'seller'],
            });
            return plainToInstance(BidOfferResponseDto, bids, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch {
            throw new InternalServerErrorException('Failed to fetch RFQ bids');
        }
    }

    async findOne(id: string): Promise<BidOfferResponseDto> {
        try {
            const bid = await this.bidRepository.findOne({
                where: { id },
                relations: ['rfq', 'seller'],
            });
            if (!bid) throw new NotFoundException('Bid not found');

            return plainToInstance(BidOfferResponseDto, bid, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to fetch bid');
        }
    }

    async create(dto: CreateBidDto): Promise<BidOfferResponseDto> {
        try {

            const { sellerId, rfqId, price, deliveryTime, status } = dto;

            const seller = await this.userService.findOne(sellerId);
            if (!seller) throw new NotFoundException('Seller not found');

            const rfq = await this.rfqService.findOne(rfqId);
            if (!rfq) throw new NotFoundException('RFQ not found');

            const bid = this.bidRepository.create({
                price,
                deliveryTime,
                status,
                seller: { id: sellerId },
                rfq: { id: rfqId },
            });


            const savedBid = await this.bidRepository.save(bid);


            return plainToInstance(BidOfferResponseDto, savedBid, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to create bid: ' + error.message,
            );
        }
    }


    async update(id: string, dto: UpdateBidOfferDto): Promise<BidOfferResponseDto> {
        try {
            const bid = await this.bidRepository.findOne({
                where: { id },
                relations: ['rfq', 'seller'],
            });
            if (!bid) throw new NotFoundException('Bid not found');

            // Increment updateCount with max limit 6
            if (bid.updateCount >= 6) {
                throw new InternalServerErrorException(
                    'This bid can only be updated 6 times',
                );
            }
            bid.updateCount = (bid.updateCount || 0) + 1;

            Object.assign(bid, dto);
            bid.updateCount = (bid.updateCount || 0) + 1;

            const updatedBid = await this.bidRepository.save(bid);
            return plainToInstance(BidOfferResponseDto, updatedBid, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to update bid');
        }
    }

    async delete(id: string): Promise<BidOfferResponseDto> {
        try {
            const bid = await this.bidRepository.findOne({ where: { id } });
            if (!bid) throw new NotFoundException('Bid not found');

            await this.bidRepository.delete(id);
            return plainToInstance(BidOfferResponseDto, bid, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to delete bid');
        }
    }
}
