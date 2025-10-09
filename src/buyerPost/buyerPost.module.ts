import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Buyerpost } from "./buyerPost.entity";
import { BuyerPostController } from "./buyerPost.controller";
import { BuyerPostService } from "./buyerPost.service";
import { CategoryModule } from "../category/category.module";
import { UserModule } from "../user/user.module";

@Module({
    imports:[TypeOrmModule.forFeature([Buyerpost]),CategoryModule,UserModule],
    controllers:[BuyerPostController],
    providers:[BuyerPostService],  
    exports:[BuyerPostService]
})
export class BuyerPostModule{   

}