
import { PartialType } from "@nestjs/swagger";
import { SampleRequestRequestDto } from "./sampleRequest.request-dto";

export class UpdateSampleRequestDto extends PartialType(SampleRequestRequestDto) { }