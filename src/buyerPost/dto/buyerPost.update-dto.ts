import { PartialType } from '@nestjs/swagger';
import { CreateBuyerPostDto } from './buyerPost.request-dto';

export class UpdateBuyerPostDto extends PartialType(CreateBuyerPostDto) {}