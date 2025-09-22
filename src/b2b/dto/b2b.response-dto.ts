// b2b.response-dto.ts
import { ApiProperty } from '@nestjs/swagger';

class B2bDescriptionResponseDto {
  @ApiProperty({ example: '200' })
  title: string;

  @ApiProperty({ example: 'Blue color, 50 pieces' })
  value: string;
}

export class B2bResponseDto {
  @ApiProperty({ example: 'd2c8a4a7-2f4e-41e7-a6f2-9876543210ab' })
  id: string;

  @ApiProperty({ type: [B2bDescriptionResponseDto], required: false })
  description?: B2bDescriptionResponseDto[];

  @ApiProperty({ example: 'XL' })
  size?: string;

  @ApiProperty({ example: 20 })
  moq?: number;

  @ApiProperty({ example: '2025-09-22T12:34:56.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-22T12:34:56.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  productId: string;
}
