import { PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "./cart.request-dto";

export class UpdateCartDto extends PartialType(CreateCartDto){}
