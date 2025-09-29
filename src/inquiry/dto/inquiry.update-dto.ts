import { PartialType } from "@nestjs/swagger";
import { InquiryRequestDto } from "./inquiry.request-dto";

export class UpdateInquiryDto extends PartialType(InquiryRequestDto) { }
