
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "./cartItem.entity";
import { CartItemController } from "./cartItem.controller";
import { CartItemService } from "./cartItem.service";
import { ProductModule } from "src/product/product.module";
import { CartModule } from "src/cart/cart.module";

@Module({
    imports:[TypeOrmModule.forFeature([CartItem]), ProductModule, CartModule],
    controllers:[CartItemController],
    providers:[CartItemService],
    exports:[]
})
export class CartItemModule{}
