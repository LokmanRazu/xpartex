import { PartialType } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './subCategory.request-dto';

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}
