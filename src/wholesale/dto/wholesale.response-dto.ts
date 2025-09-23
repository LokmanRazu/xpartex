// wholesale.response-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class WholesaleDescriptionResponseDto {
  @ApiProperty({ example: '100' })
  @Expose()
  title: string;

  @ApiProperty({ example: 'Red color, 100 pieces' })
  @Expose()
  value: string;
}

export class WholesaleResponseDto {
  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab' })
  @Expose()
  id: string;

  @ApiProperty({ type: [WholesaleDescriptionResponseDto], required: false })
  @Expose()
   @Type(() => WholesaleDescriptionResponseDto)
  description?: WholesaleDescriptionResponseDto[];

  @ApiProperty({ example: 'L' })
  @Expose()
  size?: string[];

  @ApiProperty({ example: 10 })
  @Expose()
  moq?: number;

  @ApiProperty({ example: '2025-09-22T12:34:56.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-22T12:34:56.000Z' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ example: 'a3f23a1a-4f7c-44b3-a921-1234567890ab' })
  @Expose()
  productId: string;
}
