import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { RfqService } from './rfq.service';
import { CreateRfqDto } from './dto/rfq.request-dto';
import { UpdateRfqDto } from './dto/rfq.update-dto';
import { RfqResponseDto } from './dto/rfq.response-dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { SingleFileUploadInterceptor } from '../../utils/imageUpload';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@ApiTags('RFQ')
@Controller('rfq')
export class RfqController {
  constructor(private readonly rfqService: RfqService) { }

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(SingleFileUploadInterceptor('file')) // single file upload
  @ApiOperation({ summary: 'Create a new RFQ' })
  @ApiBody({ type: CreateRfqDto })
  @ApiResponse({ status: 201, description: 'RFQ created', type: RfqResponseDto })

  async create(
    @Body() dto: CreateRfqDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<RfqResponseDto> {
    return this.rfqService.create(dto, file);
  }

  @Get('seller/:id')
  @ApiOperation({ summary: 'Get all RFQs by seller id' })
  @ApiOkResponse({ type: [RfqResponseDto] })
  async findBySellerId(@Req() req) {
    return this.rfqService.findBySellerId(req.user.id);
  }

  @Get('buyer/:id')
  @ApiOperation({ summary: 'Get all RFQs by buyer id' })
  @ApiOkResponse({ type: [RfqResponseDto] })
  async findByBuyerId(@Req() req) {
    return this.rfqService.findByBuyerId(req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update RFQ by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateRfqDto })
  @ApiResponse({ status: 200, description: 'RFQ updated', type: RfqResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRfqDto,
  ): Promise<RfqResponseDto> {
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
