// retail.request-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsUUID, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { productSizeRequestDto } from '../../wholesale/dto/wholesale.request-dto';

export class CreateRetailDto {


  @ApiProperty({ type: [productSizeRequestDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => productSizeRequestDto)
  @IsOptional()
  size?: productSizeRequestDto[];



  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;
}
