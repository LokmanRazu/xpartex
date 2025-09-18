import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Retail } from "./retail.entity";
import { RetailController } from "./retail.controller";
import { RetailService } from "./retail.service";
import { ProductModule } from "src/product/product.module";

@Module({
    imports:[TypeOrmModule.forFeature([Retail]), ProductModule],
    controllers:[RetailController],
    providers:[RetailService],
    exports:[]
})
export class RetailModule{}