import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rfq } from "./rfq.entity";
import { UserModule } from "src/user/user.module";
import { ProductModule } from "src/product/product.module";
import { RfqController } from "./rfq.controller";
import { RfqService } from "./rfq.service";

@Module({
    imports: [TypeOrmModule.forFeature([Rfq]), UserModule, ProductModule],
    controllers: [RfqController],
    providers: [RfqService],
    exports: [RfqService]
})
export class RfqModule { }