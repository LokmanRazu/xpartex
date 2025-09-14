import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsDateString } from 'class-validator';

export class CreateBuyerPostDto {
  @ApiProperty({ required: true, example: 'Looking for a house in New York' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ required: true, example: 'https://example.com/image.jpg' })
  @IsUrl({}, { message: 'Image must be a valid URL' })
  @IsNotEmpty({ message: 'Image is required' })
  img: string;

  @ApiProperty({ required: false, example: 'New York, USA' })
  @IsString({ message: 'Location must be a string' })
  @IsOptional()
  location?: string;

  @ApiProperty({ required: true, example: '2025-09-15T10:00:00Z' })
  @IsDateString({}, { message: 'Duration must be a valid date string (ISO format)' })
  @IsNotEmpty({ message: 'Duration is required' })
  duration: Date;
}
