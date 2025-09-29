import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.request-dto';
import { UpdateProductDto } from './dto/product.update-dto';
import { ProductResponseDto } from './dto/product.response-dto';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MultiFileUploadInterceptor } from '../../utils/imageUpload';

@ApiBearerAuth('JWT-auth')
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

    @UseGuards(AuthGuard('jwt'))
    @Get('/userProduct')
    @ApiOperation({ summary: 'Get all products by user' })
    @ApiResponse({ status: 200, description: 'List of products', type: [ProductResponseDto] })
    async findAllByUser(@Req() req): Promise<ProductResponseDto[]> {
        return this.productService.findAllByUser(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Product details', type: ProductResponseDto })
    async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
        return this.productService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        MultiFileUploadInterceptor([
            { name: 'img', maxCount: 1 },
            { name: 'additionalImages', maxCount: 5 },
        ]),
    )
    @ApiOperation({ summary: 'Create a new product' })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ status: 201, description: 'Product created', type: ProductResponseDto })
    async create(@Body() dto: CreateProductDto, @UploadedFiles()
    files: {
        img?: Express.Multer.File[];
        additionalImages?: Express.Multer.File[];
    },): Promise<ProductResponseDto> {
        return this.productService.create(dto, files);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    @ApiOperation({ summary: 'Update product by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'Product updated', type: ProductResponseDto })
    async update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<ProductResponseDto> {
        return this.productService.update(id, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiOperation({ summary: 'Delete product by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Product deleted', type: ProductResponseDto })
    async remove(@Param('id') id: string): Promise<ProductResponseDto> {
        return this.productService.delete(id);
    }
}
