import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { B2bService } from './b2b.service';
import { CreateB2bDto } from './dto/b2b.request-dto';
import { UpdateB2bDto } from './dto/b2b.update-dto';
import { B2bResponseDto } from './dto/b2b.response-dto';

@ApiTags('B2b')
@Controller('b2b')
export class B2bController {
  constructor(private readonly b2bService: B2bService) {}

  @Get()
  @ApiOperation({ summary: 'Get all b2b records' })
  @ApiResponse({ status: 200, description: 'List of b2bs', type: [B2bResponseDto] })
  async findAll(): Promise<B2bResponseDto[]> {
    return this.b2bService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get b2b by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'B2b details', type: B2bResponseDto })
  async findOne(@Param('id') id: string): Promise<B2bResponseDto> {
    return this.b2bService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new b2b record' })
  @ApiBody({ type: CreateB2bDto })
  @ApiResponse({ status: 201, description: 'B2b created', type: B2bResponseDto })
  async create(@Body() dto: CreateB2bDto): Promise<B2bResponseDto> {
    return this.b2bService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update b2b by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateB2bDto })
  @ApiResponse({ status: 200, description: 'B2b updated', type: B2bResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateB2bDto,
  ): Promise<B2bResponseDto> {
    return this.b2bService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete b2b by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'B2b deleted', type: B2bResponseDto })
  async remove(@Param('id') id: string): Promise<B2bResponseDto> {
    return this.b2bService.delete(id);
  }
}
