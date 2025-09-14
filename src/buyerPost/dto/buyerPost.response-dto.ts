import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BuyerPostResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  img: string;

  @ApiProperty({ required: false })
  @Expose()
  location?: string;

  @ApiProperty()
  @Expose()
  duration: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
