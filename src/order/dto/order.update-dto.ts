
import { PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./order.request-dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto){}
