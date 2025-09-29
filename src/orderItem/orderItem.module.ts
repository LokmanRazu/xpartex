
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "./orderItem.entity";
import { OrderItemController } from "./orderItem.controller";
import { OrderItemService } from "./orderItem.service";
import { OrderModule } from "../order/order.module";
import { ProductModule } from "../product/product.module";

@Module({
    imports:[TypeOrmModule.forFeature([OrderItem]), OrderModule, ProductModule],
    controllers:[OrderItemController],
    providers:[OrderItemService],
    exports:[OrderItemService]
})
export class OrderItemModule{}
