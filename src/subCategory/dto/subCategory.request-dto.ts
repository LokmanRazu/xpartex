import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubCategoryDto {
    @ApiProperty({ required: true, example: 'Electronics' })
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @ApiProperty({ required: true, example: 'category-uuid' })
    @IsString({ message: 'Category ID must be a string' })
    @IsNotEmpty({ message: 'Category ID is required' })
    categoryId: string;
}
