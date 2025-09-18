
import { PartialType } from "@nestjs/swagger";
import { CreateCartItemDto } from "./cartItem.request-dto";

export class UpdateCartItemDto extends PartialType(CreateCartItemDto){}
