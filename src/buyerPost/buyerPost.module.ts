import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Buyerpost } from "./buyerPost.entity";
import { BuyerPostController } from "./buyerPost.controller";
import { BuyerPostService } from "./buyerPost.service";

@Module({
    imports:[TypeOrmModule.forFeature([Buyerpost])],
    controllers:[BuyerPostController],
    providers:[BuyerPostService],  
    exports:[]
})
export class BuyerPostModule{   

}