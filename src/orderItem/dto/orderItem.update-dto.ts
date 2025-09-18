
import { PartialType } from "@nestjs/swagger";
import { CreateOrderItemDto } from "./orderItem.request-dto";

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto){}
