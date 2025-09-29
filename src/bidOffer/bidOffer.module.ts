import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BidOffer } from "./bidOffer.entity";
import { BidOfferController } from "./bidOffer.controller";
import { BidOfferService } from "./bidOffer.service";
import { RfqModule } from "../rfq/rfq.module";
import { UserModule } from "..//user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([BidOffer]),UserModule,RfqModule],
    controllers: [BidOfferController],
    providers: [BidOfferService],
    exports: [BidOfferService]
})
export class BidOfferModule {}