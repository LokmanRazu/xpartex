import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { InquiryRequestDto } from './dto/inquiry.request-dto';
import { UpdateInquiryDto } from './dto/inquiry.update-dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InquiryResponseDto } from './dto/inquiry.response-dto';
import { AuthGuard } from '@nestjs/passport';


// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('jwt'))
@ApiTags('Inquiry')
@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new inquiry' })
  @ApiOkResponse({ type: InquiryResponseDto })
  create(
    @Body() inquiryRequestDto: InquiryRequestDto,
  ) {
    return this.inquiryService.create(inquiryRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all inquiries' })
  @ApiOkResponse({ type: [InquiryResponseDto] })
  findAll() {
    return this.inquiryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a inquiry by id' })
  @ApiOkResponse({ type: InquiryResponseDto })
  findOne(@Param('id') id: string) {
    return this.inquiryService.findOne(id);
  }

  @Get('seller/:id')
  @ApiOperation({ summary: 'Get all inquiries by seller id' })
  @ApiOkResponse({ type: [InquiryResponseDto] })
  findBySellerId(@Param('id') id: string) {
    return this.inquiryService.findBySellerId(id);
  }

  @Get('buyer/:id')
  @ApiOperation({ summary: 'Get all inquiries by buyer id' })
  @ApiOkResponse({ type: [InquiryResponseDto] })
  findByBuyerId(@Param('id') id: string) {
    return this.inquiryService.findByBuyerId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a inquiry' })
  @ApiOkResponse({ type: InquiryResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateInquiryDto: UpdateInquiryDto,
  ) {
    return this.inquiryService.update(id, updateInquiryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a inquiry' })
  @ApiOkResponse({ type: InquiryResponseDto })
  delete(@Param('id') id: string) {
    return this.inquiryService.delete(id);
  }
}
