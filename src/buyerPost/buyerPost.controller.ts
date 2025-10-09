import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { BuyerPostService } from './buyerPost.service';
import { BuyerPostResponseDto } from './dto/buyerPost.response-dto';
import { CreateBuyerPostDto } from './dto/buyerPost.request-dto';
import { UpdateBuyerPostDto } from './dto/buyerPost.update-dto';
import { AuthGuard } from '@nestjs/passport';
import { SingleFileUploadInterceptor } from '../../utils/imageUpload';

@ApiBearerAuth('JWT-auth')
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
  
 @UseGuards(AuthGuard('jwt'))
  @Get('user/:Id')
  @ApiOperation({ summary: 'Get buyer posts by user ID' })
  @ApiResponse({ status: 200, description: 'List of buyer posts', type: [BuyerPostResponseDto] })
  async findByUserId(@Req() req): Promise<BuyerPostResponseDto[]> {
    return this.buyerPostService.findByUserId(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(SingleFileUploadInterceptor('attachment')) // same logic as RFQ
  @ApiOperation({ summary: 'Create a new buyer post' })
  @ApiBody({ type: CreateBuyerPostDto })
  @ApiResponse({ status: 201, description: 'Buyer post created', type: BuyerPostResponseDto })
  async create(
    @Body() dto: CreateBuyerPostDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BuyerPostResponseDto> {
    return this.buyerPostService.create(dto, file);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update buyer post by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBuyerPostDto })
  @ApiResponse({ status: 200, description: 'Buyer post updated', type: BuyerPostResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateBuyerPostDto): Promise<BuyerPostResponseDto> {
    return this.buyerPostService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete buyer post by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Buyer post deleted', type: BuyerPostResponseDto })
  async remove(@Param('id') id: string): Promise<BuyerPostResponseDto> {
    return this.buyerPostService.delete(id);
  }
}
