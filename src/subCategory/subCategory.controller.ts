import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { SubCategoryService } from './subCategory.service';
import { SubCategoryResponseDto } from './dto/subCategory.response-dto';
import { CreateSubCategoryDto } from './dto/subCategory.request-dto';
import { UpdateSubCategoryDto } from './dto/subCategory.update-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('SubCategory')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sub categories' })
  @ApiResponse({ status: 200, description: 'List of sub categories', type: [SubCategoryResponseDto] })
  async findAll(): Promise<SubCategoryResponseDto[]> {
    return this.subCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sub category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Sub category details', type: SubCategoryResponseDto })
  async findOne(@Param('id') id: string): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new sub category' })
  @ApiBody({ type: CreateSubCategoryDto })
  @ApiResponse({ status: 201, description: 'Sub category created', type: SubCategoryResponseDto })
  async create(@Body() dto: CreateSubCategoryDto): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.create(dto);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update sub category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateSubCategoryDto })
  @ApiResponse({ status: 200, description: 'Sub category updated', type: SubCategoryResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.update(id, dto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete sub category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Sub category deleted', type: SubCategoryResponseDto })
  async remove(@Param('id') id: string): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.delete(id);
  }
}
