import { PartialType } from "@nestjs/swagger";
import { CreateWholesaleDto } from "./wholesale.request-dto";

export class UpdateWholesaleDto extends PartialType(CreateWholesaleDto){}