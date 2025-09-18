import { PartialType } from "@nestjs/swagger";
import { CreateRetailDto } from "./retail.request-dto";

export class UpdateRetailDto extends PartialType(CreateRetailDto){}
