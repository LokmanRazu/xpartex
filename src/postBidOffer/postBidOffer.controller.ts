import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostBidOfferService } from './postBidOffer.service';
import { PostBidOfferRequestDto } from './dto/postBidOffer.request-dto';
import { UpdatePostBidOfferDto } from './dto/postBidOffer.update-dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostBidOfferResponseDto } from './dto/postBidOffer.response-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@ApiTags('PostBidOffer')
@Controller('post-bid-offer')
export class PostBidOfferController {
  constructor(private readonly postBidOfferService: PostBidOfferService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post bid offer' })
  @ApiOkResponse({ type: PostBidOfferResponseDto })
  create(@Body() postBidOfferRequestDto: PostBidOfferRequestDto) {
    return this.postBidOfferService.create(postBidOfferRequestDto);
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
