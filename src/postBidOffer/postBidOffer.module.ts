import { Module } from '@nestjs/common';
import { PostBidOfferController } from './postBidOffer.controller';
import { PostBidOfferService } from './postBidOffer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostBidOffer } from './postBidOffer.entity';
import { BuyerPostModule } from '../buyerPost/buyerPost.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostBidOffer]),
    BuyerPostModule,
    UserModule,
  ],
  controllers: [PostBidOfferController],
  providers: [PostBidOfferService],
  exports: [PostBidOfferService],
})
export class PostBidOfferModule {}
