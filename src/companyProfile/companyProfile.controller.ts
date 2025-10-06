import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CompanyProfileService } from './companyProfile.service';
import { CompanyProfileRequestDto } from './dto/companyProfile.request-dto';
import { UpdateCompanyProfileDto } from './dto/companyProfile.update-dto';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyProfileResponseDto } from './dto/companyProfile.response-dto';
import { MultiFileUploadInterceptor } from '../../utils/imageUpload';
import { AuthGuard } from '@nestjs/passport';
import { UpdateSampleRequestDto } from '../sampleRequest/dto/sampleRequest.update-dto';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@ApiTags('CompanyProfile')
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

@Post()
@ApiConsumes('multipart/form-data')
@UseInterceptors(MultiFileUploadInterceptor([{ name: 'img', maxCount: 1 }]))
@ApiOperation({ summary: 'Create a new company profile' })
@ApiOkResponse({ type: CompanyProfileResponseDto })
async create(
  @Body() dto: CompanyProfileRequestDto,
  @UploadedFiles() files: { img?: Express.Multer.File[] },
): Promise<CompanyProfileResponseDto> {
  return this.companyProfileService.create(dto, files);
}


  @Get()
  @ApiOperation({ summary: 'Get all company profiles' })
  @ApiOkResponse({ type: [CompanyProfileResponseDto] })
  findAll() {
    return this.companyProfileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company profile by id' })
  @ApiOkResponse({ type: CompanyProfileResponseDto })
  findOne(@Param('id') id: string) {
    return this.companyProfileService.findOne(id);
  }

  @Get('createdBy/:userId')
  @ApiOperation({ summary: 'Get all company profiles by user id' })
  @ApiOkResponse({ type: [CompanyProfileResponseDto] })
  findByUserId(@Req() req) {
    return this.companyProfileService.findByUserId(req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company profile' })
  @ApiOkResponse({ type: CompanyProfileResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateCompanyProfileDto: UpdateCompanyProfileDto,
  ) {
    return this.companyProfileService.update(id, updateCompanyProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company profile' })
  @ApiOkResponse({ type: CompanyProfileResponseDto })
  delete(@Param('id') id: string) {
    return this.companyProfileService.delete(id);
  }
}
