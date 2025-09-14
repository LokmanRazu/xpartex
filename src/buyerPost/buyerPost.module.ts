import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuyerPost } from "./buyerPost.entity";
import { BuyerPostController } from "./buyerPost.controller";
import { BuyerPostService } from "./buyerPost.service";

@Module({
    imports:[TypeOrmModule.forFeature([BuyerPost])],
    controllers:[BuyerPostController],
    providers:[BuyerPostService],  
    exports:[]
})
export class BuyerPostModule{   

}