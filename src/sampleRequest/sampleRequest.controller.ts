import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { SampleRequestService } from './sampleRequest.service';
import { SampleRequestRequestDto } from './dto/sampleRequest.request-dto';
import { UpdateSampleRequestDto } from './dto/sampleRequest.update-dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SampleRequestResponseDto } from './dto/sampleRequest.response-dto';

@ApiTags('SampleRequest')
@Controller('sample-request')
export class SampleRequestController {
  constructor(private readonly sampleRequestService: SampleRequestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sample request' })
  @ApiOkResponse({ type: SampleRequestResponseDto })
  create(
    @Body() sampleRequestRequestDto: SampleRequestRequestDto,
  ) {
    return this.sampleRequestService.create(sampleRequestRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sample requests' })
  @ApiOkResponse({ type: [SampleRequestResponseDto] })
  findAll() {
    return this.sampleRequestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sample request by id' })
  @ApiOkResponse({ type: SampleRequestResponseDto })
  findOne(@Param('id') id: string) {
    return this.sampleRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sample request' })
  @ApiOkResponse({ type: SampleRequestResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateSampleRequestDto: UpdateSampleRequestDto,
  ) {
    return this.sampleRequestService.update(id, updateSampleRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sample request' })
  @ApiOkResponse({ type: SampleRequestResponseDto })
  delete(@Param('id') id: string) {
    return this.sampleRequestService.delete(id);
  }
}
