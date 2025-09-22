// retail.request-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateRetailDto {


  @ApiProperty({ example: 100 })
  @IsString({ message: 'Size must be a string' })
  @IsOptional({ message: 'Size is required' })
  size?: string;



  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;
}
