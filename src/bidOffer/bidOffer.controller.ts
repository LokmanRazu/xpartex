import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateBidDto } from './dto/bidOffer.request-dto';
import { UpdateBidOfferDto } from './dto/bidOffer.update-dto';
import { BidOfferResponseDto } from './dto/bidOffer.response-dto';
import { BidOfferService } from './bidOffer.service';

@ApiTags('Bids')
@Controller('bids')
export class BidOfferController {
  constructor(private readonly bidService: BidOfferService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bids' })
  @ApiResponse({ status: 200, description: 'List of bids', type: [BidOfferResponseDto] })
  async findAll(): Promise<BidOfferResponseDto[]> {
    return this.bidService.findAll();
  }

  @Get('seller/:sellerId')
  @ApiOperation({ summary: 'Get bids by seller ID' })
  @ApiParam({ name: 'sellerId', type: String })
  @ApiResponse({ status: 200, description: 'List of seller bids', type: [BidOfferResponseDto] })
  async findBySeller(@Param('sellerId') sellerId: string): Promise<BidOfferResponseDto[]> {
    return this.bidService.findBySeller(sellerId);
  }

  @Get('rfq/:rfqId')
  @ApiOperation({ summary: 'Get bids by RFQ ID' })
  @ApiParam({ name: 'rfqId', type: String })
  @ApiResponse({ status: 200, description: 'List of RFQ bids', type: [BidOfferResponseDto] })
  async findByRfq(@Param('rfqId') rfqId: string): Promise<BidOfferResponseDto[]> {
    return this.bidService.findByRfq(rfqId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bid by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Bid details', type: BidOfferResponseDto })
  async findOne(@Param('id') id: string): Promise<BidOfferResponseDto> {
    return this.bidService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bid' })
  @ApiBody({ type: CreateBidDto })
  @ApiResponse({ status: 201, description: 'Bid created', type: BidOfferResponseDto })
  async create(@Body() dto: CreateBidDto): Promise<BidOfferResponseDto> {
    return this.bidService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update bid by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBidOfferDto })
  @ApiResponse({ status: 200, description: 'Bid updated', type: BidOfferResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBidOfferDto,
  ): Promise<BidOfferResponseDto> {
    return this.bidService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bid by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Bid deleted', type: BidOfferResponseDto })
  async delete(@Param('id') id: string): Promise<BidOfferResponseDto> {
    return this.bidService.delete(id);
  }
}
