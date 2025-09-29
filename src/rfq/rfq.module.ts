import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rfq } from "./rfq.entity";
import { UserModule } from "../user/user.module";
import { ProductModule } from "../product/product.module";
import { RfqController } from "./rfq.controller";
import { RfqService } from "./rfq.service";
import { OrderItemModule } from "../orderItem/orderItem.module";

@Module({
    imports: [TypeOrmModule.forFeature([Rfq]), UserModule, ProductModule,OrderItemModule],
    controllers: [RfqController],
    providers: [RfqService],
    exports: [RfqService]
})
export class RfqModule { }