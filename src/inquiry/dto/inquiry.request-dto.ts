import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class InquiryRequestDto {
  @ApiProperty({
    example: 10,
    description: 'Requested quantity for the inquiry',
  })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;

  @ApiProperty({
    example: 'Looking for high-quality spare parts',
    description: 'Description of the inquiry',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    example: 'https://example.com/files/specifications.pdf',
    description: 'Attachment file link or path related to the inquiry',
  })
  @IsString({ message: 'Attachment must be a string' })
  @IsOptional({ message: 'Attachment is Optional' })
  attachment: string;

  @ApiProperty({
    example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab',
    description: 'Product linked to this inquiry',
  })
  @IsUUID('4', { message: 'ProductId must be a valid UUID' })
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;

  @ApiProperty({
    example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab',
    description: 'buyerId linked to this inquiry',
  })
  @IsUUID('4', { message: 'buyerId must be a valid UUID' })
  @IsNotEmpty({ message: 'buyerId is required' })
  buyerId: string;
}
