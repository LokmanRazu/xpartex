
import { PartialType } from "@nestjs/swagger";
import { ProfileRequestDto } from "./userProfile.request-dto";

export class UpdateProfileDto extends PartialType(ProfileRequestDto) { }