import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { WholesaleService } from './wholesale.service';
import { CreateWholesaleDto } from './dto/wholesale.request-dto';
import { UpdateWholesaleDto } from './dto/wholesale.update-dto';
import { WholesaleResponseDto } from './dto/wholesale.response-dto';

@ApiTags('Wholesale')
@Controller('wholesale')
export class WholesaleController {
  constructor(private readonly wholesaleService: WholesaleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all wholesale records' })
  @ApiResponse({ status: 200, description: 'List of wholesales', type: [WholesaleResponseDto] })
  async findAll(): Promise<WholesaleResponseDto[]> {
    return this.wholesaleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wholesale by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Wholesale details', type: WholesaleResponseDto })
  async findOne(@Param('id') id: string): Promise<WholesaleResponseDto> {
    return this.wholesaleService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new wholesale record' })
  @ApiBody({ type: CreateWholesaleDto })
  @ApiResponse({ status: 201, description: 'Wholesale created', type: WholesaleResponseDto })
  async create(@Body() dto: CreateWholesaleDto): Promise<WholesaleResponseDto> {
    return this.wholesaleService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update wholesale by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateWholesaleDto })
  @ApiResponse({ status: 200, description: 'Wholesale updated', type: WholesaleResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWholesaleDto,
  ): Promise<WholesaleResponseDto> {
    return this.wholesaleService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wholesale by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Wholesale deleted', type: WholesaleResponseDto })
  async remove(@Param('id') id: string): Promise<WholesaleResponseDto> {
    return this.wholesaleService.delete(id);
  }
}
