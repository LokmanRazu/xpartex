// wholesale.request-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateWholesaleDto {

  @ApiProperty({ example: 'Wholesale package of 100 cotton T-shirts' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional({ message: 'Description is optional' })
  description: string[];

  @ApiProperty({ example: 100 })
  @IsNumber({}, { message: 'Size must be a number' })
  @IsOptional({ message: 'Size is optional' })
  size: number;

  @ApiProperty({ example: 10 })
  @IsNumber({}, { message: 'MOQ must be a number' })
  @IsOptional({ message: 'MOQ is optional' })
  moq: number;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;
}
