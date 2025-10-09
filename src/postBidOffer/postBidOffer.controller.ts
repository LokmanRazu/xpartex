import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostBidOfferService } from './postBidOffer.service';
import { PostBidOfferRequestDto } from './dto/postBidOffer.request-dto';
import { UpdatePostBidOfferDto } from './dto/postBidOffer.update-dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostBidOfferResponseDto } from './dto/postBidOffer.response-dto';
import { AuthGuard } from '@nestjs/passport';
import { SingleFileUploadInterceptor } from '../../utils/imageUpload';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@ApiTags('PostBidOffer')
@Controller('post-bid-offer')
export class PostBidOfferController {
  constructor(private readonly postBidOfferService: PostBidOfferService) {}

@UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(SingleFileUploadInterceptor('attachment')) // ⬅️ handles file
  @ApiOperation({ summary: 'Create a new post bid offer' })
  @ApiBody({ type: PostBidOfferRequestDto })
  @ApiResponse({ status: 201, description: 'Post bid offer created', type: PostBidOfferResponseDto })
  async create(
    @Body() dto: PostBidOfferRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostBidOfferResponseDto> {
    return this.postBidOfferService.create(dto, file);
  }


  @Get()
  @ApiOperation({ summary: 'Get all post bid offers' })
  @ApiOkResponse({ type: [PostBidOfferResponseDto] })
  findAll() {
    return this.postBidOfferService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post bid offer by id' })
  @ApiOkResponse({ type: PostBidOfferResponseDto })
  findOne(@Param('id') id: string) {
    return this.postBidOfferService.findOne(id);
  }

  @Get('bidder/:id')
  @ApiOperation({ summary: 'Get all post bid offers by bidder id' })
  @ApiOkResponse({ type: [PostBidOfferResponseDto] })
  findByBidderId(@Req() req) {
    return this.postBidOfferService.findByBidderId(req.user.id);
  }

  @Get('buyer/:id')
  @ApiOperation({ summary: 'Get all post bid offers by buyer id' })
  @ApiOkResponse({ type: [PostBidOfferResponseDto] })
  findByBuyerId(@Req() req) {
    return this.postBidOfferService.findByBuyerId(req.user.id);
  }

  @Get('condirm/:id')
  @ApiOperation({ summary: 'Confirm a post bid offer' })
  @ApiOkResponse({ type: PostBidOfferResponseDto })
  confirmBid(@Param('id') id: string) {
    return this.postBidOfferService.confirmBid(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post bid offer' })
  @ApiOkResponse({ type: PostBidOfferResponseDto })
  update(
    @Param('id') id: string,
    @Body() updatePostBidOfferDto: UpdatePostBidOfferDto,
  ) {
    return this.postBidOfferService.update(id, updatePostBidOfferDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post bid offer' })
  @ApiOkResponse({ type: PostBidOfferResponseDto })
  delete(@Param('id') id: string) {
    return this.postBidOfferService.delete(id);
  }
}
