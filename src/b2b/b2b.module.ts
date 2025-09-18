import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { B2b } from "./b2b.entity";
import { B2bController } from "./b2b.controller";
import { B2bService } from "./b2b.service";
import { ProductModule } from "src/product/product.module";

@Module({
    imports:[TypeOrmModule.forFeature([B2b]), ProductModule],
    controllers:[B2bController],
    providers:[B2bService],
    exports:[]
})
export class B2bModule{}