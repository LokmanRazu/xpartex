import { PartialType } from "@nestjs/swagger";
import { PaymentRequestDto } from "./payment.request-dto";

export class UpdatePaymentDto extends PartialType(PaymentRequestDto) { }
