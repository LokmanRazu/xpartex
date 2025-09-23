// b2b.request-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNotEmpty, 
  IsString, 
  IsNumber, 
  IsUUID, 
  IsOptional, 
  ValidateNested, 
  IsArray 
} from 'class-validator';
import { Type } from 'class-transformer';
import { productSizeRequestDto } from 'src/wholesale/dto/wholesale.request-dto';

class B2bDescriptionDto {
  @ApiProperty({ example: 200 })
  @IsString( { message: 'Price must be a number' })
  title: string;

  @ApiProperty({ example: 'Blue color, 50 pieces' })
  @IsString({ message: 'Value must be a string' })
  value: string;
}

export class CreateB2bDto {
  @ApiProperty({ type: [B2bDescriptionDto], required: false })
  @IsArray({ message: 'Description must be an array' })
  @ValidateNested({ each: true })
  @Type(() => B2bDescriptionDto)
  @IsOptional()
  description?: B2bDescriptionDto[];

  @ApiProperty({ type:[productSizeRequestDto]})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => productSizeRequestDto)
  @IsOptional()
  size?: productSizeRequestDto[];

  @ApiProperty({ example: 20 })
  @IsNumber({}, { message: 'MOQ must be a number' })
  @IsOptional()
  moq?: number;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;
}
