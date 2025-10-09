import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubCategory } from "./subCategory.entity";
import { SubCategoryController } from "./subCategory.controller";
import { SubCategoryService } from "./subCategory.service";

@Module({
    imports:[TypeOrmModule.forFeature([SubCategory])],
    controllers:[SubCategoryController],
    providers:[SubCategoryService],
    exports:[SubCategoryService]
})
export class SubCategoryModule{}