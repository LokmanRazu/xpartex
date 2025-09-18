import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[TypeOrmModule.forFeature([Cart]), UserModule],
    controllers:[CartController],
    providers:[CartService],
    exports:[CartService]
})
export class CartModule{}