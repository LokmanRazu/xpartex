// wholesale.request-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUUID, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class WholesaleDescriptionDto {
  @ApiProperty({ example: 100 })
  @IsString({ message: 'Price must be a number' })
  title: string;

  @ApiProperty({ example: 'Red color, 100 pieces' })
  @IsString({ message: 'Value must be a string' })
  value: string;
}

export class CreateWholesaleDto {

  @ApiProperty({ type: [WholesaleDescriptionDto], required: false })
  @IsArray({ message: 'Description must be an array' })
  @ValidateNested({ each: true })
  @Type(() => WholesaleDescriptionDto)
  @IsOptional()
  description?: WholesaleDescriptionDto[];

  @ApiProperty({ example: 'L' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  size?: string[];

  @ApiProperty({ example: 10 })
  @IsNumber({}, { message: 'MOQ must be a number' })
  @IsOptional()
  moq?: number;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;
}
