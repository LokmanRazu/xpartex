import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { BuyerPostService } from './buyerPost.service';
import { BuyerPostResponseDto } from './dto/buyerPost.response-dto';
import { CreateBuyerPostDto } from './dto/buyerPost.request-dto';
import { UpdateBuyerPostDto } from './dto/buyerPost.update-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@ApiTags('BuyerPost')
@Controller('buyer-post')
export class BuyerPostController {
  constructor(private readonly buyerPostService: BuyerPostService) {}

  @Get()
  @ApiOperation({ summary: 'Get all buyer posts' })
  @ApiResponse({ status: 200, description: 'List of buyer posts', type: [BuyerPostResponseDto] })
  async findAll(): Promise<BuyerPostResponseDto[]> {
    return this.buyerPostService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get buyer post by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Buyer post details', type: BuyerPostResponseDto })
  async findOne(@Param('id') id: string): Promise<BuyerPostResponseDto> {
    return this.buyerPostService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new buyer post' })
  @ApiBody({ type: CreateBuyerPostDto })
  @ApiResponse({ status: 201, description: 'Buyer post created', type: BuyerPostResponseDto })
  async create(@Body() dto: CreateBuyerPostDto): Promise<BuyerPostResponseDto> {
    return this.buyerPostService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update buyer post by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBuyerPostDto })
  @ApiResponse({ status: 200, description: 'Buyer post updated', type: BuyerPostResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateBuyerPostDto): Promise<BuyerPostResponseDto> {
    return this.buyerPostService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete buyer post by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Buyer post deleted', type: BuyerPostResponseDto })
  async remove(@Param('id') id: string): Promise<BuyerPostResponseDto> {
    return this.buyerPostService.delete(id);
  }
}
