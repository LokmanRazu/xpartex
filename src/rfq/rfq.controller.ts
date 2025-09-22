import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RfqService } from './rfq.service';
import { CreateRfqDto } from './dto/rfq.request-dto';
import { UpdateRfqDto } from './dto/rfq.update-dto';
import { RfqResponseDto } from './dto/rfq.response-dto';

@ApiTags('RFQ')
@Controller('rfq')
export class RfqController {
  constructor(private readonly rfqService: RfqService) {}

  @Get()
  @ApiOperation({ summary: 'Get all RFQs' })
  @ApiResponse({ status: 200, description: 'List of RFQs', type: [RfqResponseDto] })
  async findAll(): Promise<RfqResponseDto[]> {
    return this.rfqService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get RFQ by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'RFQ details', type: RfqResponseDto })
  async findOne(@Param('id') id: string): Promise<RfqResponseDto> {
    return this.rfqService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new RFQ' })
  @ApiBody({ type: CreateRfqDto })
  @ApiResponse({ status: 201, description: 'RFQ created', type: RfqResponseDto })
  async create(@Body() dto: CreateRfqDto): Promise<RfqResponseDto> {
    return this.rfqService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update RFQ by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateRfqDto })
  @ApiResponse({ status: 200, description: 'RFQ updated', type: RfqResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateRfqDto): Promise<RfqResponseDto> {
    return this.rfqService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete RFQ by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'RFQ deleted', type: RfqResponseDto })
  async remove(@Param('id') id: string): Promise<RfqResponseDto> {
    return this.rfqService.delete(id);
  }
}
