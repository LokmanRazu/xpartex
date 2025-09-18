import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RetailService } from './retail.service';
import { CreateRetailDto } from './dto/retail.request-dto';
import { UpdateRetailDto } from './dto/retail.update-dto';
import { RetailResponseDto } from './dto/retail.response-dto';

@ApiTags('Retail')
@Controller('retail')
export class RetailController {
  constructor(private readonly retailService: RetailService) {}

  @Get()
  @ApiOperation({ summary: 'Get all retail records' })
  @ApiResponse({ status: 200, description: 'List of retails', type: [RetailResponseDto] })
  async findAll(): Promise<RetailResponseDto[]> {
    return this.retailService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get retail by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Retail details', type: RetailResponseDto })
  async findOne(@Param('id') id: string): Promise<RetailResponseDto> {
    return this.retailService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new retail record' })
  @ApiBody({ type: CreateRetailDto })
  @ApiResponse({ status: 201, description: 'Retail created', type: RetailResponseDto })
  async create(@Body() dto: CreateRetailDto): Promise<RetailResponseDto> {
    return this.retailService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update retail by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateRetailDto })
  @ApiResponse({ status: 200, description: 'Retail updated', type: RetailResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRetailDto,
  ): Promise<RetailResponseDto> {
    return this.retailService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete retail by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Retail deleted', type: RetailResponseDto })
  async remove(@Param('id') id: string): Promise<RetailResponseDto> {
    return this.retailService.delete(id);
  }
}
