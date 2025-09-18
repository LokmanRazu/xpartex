import { PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "./category.request-dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto){}
