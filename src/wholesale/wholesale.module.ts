import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wholesale } from "./wholesale.entity";
import { WholesaleController } from "./wholesale.controller";
import { WholesaleService } from "./wholesale.service";
import { ProductModule } from "src/product/product.module";

@Module({
    imports:[TypeOrmModule.forFeature([Wholesale]), ProductModule],
    controllers:[WholesaleController],
    providers:[WholesaleService],
    exports:[]
})
export class WholesaleModule{}