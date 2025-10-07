import { PartialType } from "@nestjs/swagger";
import { PostBidOfferRequestDto } from "./postBidOffer.request-dto";

export class UpdatePostBidOfferDto extends PartialType(PostBidOfferRequestDto) { }
