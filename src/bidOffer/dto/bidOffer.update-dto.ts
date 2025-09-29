import { PartialType } from "@nestjs/swagger";
import { CreateBidDto } from "./bidOffer.request-dto";

export class UpdateBidOfferDto extends PartialType(CreateBidDto) {}