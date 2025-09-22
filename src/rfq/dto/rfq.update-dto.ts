import { PartialType } from "@nestjs/swagger";
import { CreateRfqDto } from "./rfq.request-dto";

export class UpdateRfqDto extends PartialType(CreateRfqDto){}