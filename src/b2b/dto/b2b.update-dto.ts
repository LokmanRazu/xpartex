import { PartialType } from "@nestjs/swagger";
import { CreateB2bDto } from "./b2b.request-dto";

export class UpdateB2bDto extends PartialType(CreateB2bDto){}
