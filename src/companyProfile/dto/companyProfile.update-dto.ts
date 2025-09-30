import { PartialType } from '@nestjs/swagger';
import { CompanyProfileRequestDto } from './companyProfile.request-dto';

export class UpdateCompanyProfileDto extends PartialType(CompanyProfileRequestDto) {}
