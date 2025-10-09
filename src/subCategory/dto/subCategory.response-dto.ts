import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from '../../category/dto/category.response-dto';

export class SubCategoryResponseDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'Smartphones' })
    @Expose()
    title: string;

    @ApiProperty({ description: 'Category details' })
    @Type(() => CategoryResponseDto)
    @Expose()
    category: CategoryResponseDto;
}
