
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProductModule } from "../product/product.module";
import { UserModule } from "..//user/user.module";
import { PostBidOfferModule } from "../postBidOffer/postBidOffer.module";

@Module({
    imports:[TypeOrmModule.forFeature([Order]),ProductModule,UserModule,PostBidOfferModule],
    controllers:[OrderController],
    providers:[OrderService],
    exports:[OrderService]
})
export class OrderModule{}
