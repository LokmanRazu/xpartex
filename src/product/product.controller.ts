import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.request-dto';
import { UpdateProductDto } from './dto/product.update-dto';
import { ProductResponseDto } from './dto/product.response-dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of products', type: [ProductResponseDto] })
    async findAll(): Promise<ProductResponseDto[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Product details', type: ProductResponseDto })
    async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
        return this.productService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ status: 201, description: 'Product created', type: ProductResponseDto })
    async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
        return this.productService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update product by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'Product updated', type: ProductResponseDto })
    async update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<ProductResponseDto> {
        return this.productService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete product by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Product deleted', type: ProductResponseDto })
    async remove(@Param('id') id: string): Promise<ProductResponseDto> {
        return this.productService.delete(id);
    }
}
