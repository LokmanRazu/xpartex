import { PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./product.request-dto";

export class UpdateProductDto extends PartialType(CreateProductDto){}