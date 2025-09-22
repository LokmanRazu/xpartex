// wholesale.response-dto.ts
import { ApiProperty } from '@nestjs/swagger';

class WholesaleDescriptionResponseDto {
  @ApiProperty({ example: '100' })
  title: string;

  @ApiProperty({ example: 'Red color, 100 pieces' })
  value: string;
}

export class WholesaleResponseDto {
  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  id: string;

  @ApiProperty({ type: [WholesaleDescriptionResponseDto], required: false })
  description?: WholesaleDescriptionResponseDto[];

  @ApiProperty({ example: 'L' })
  size?: string;

  @ApiProperty({ example: 10 })
  moq?: number;

  @ApiProperty({ example: '2025-09-22T12:34:56.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-22T12:34:56.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: 'a3f23a1a-4f7c-44b3-a921-1234567890ab' })
  productId: string;
}
