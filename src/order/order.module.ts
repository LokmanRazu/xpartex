
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProductModule } from "src/product/product.module";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[TypeOrmModule.forFeature([Order]),ProductModule,UserModule],
    controllers:[OrderController],
    providers:[OrderService],
    exports:[OrderService]
})
export class OrderModule{}
