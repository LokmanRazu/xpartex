import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyProfileService } from './companyProfile.service';
import { CompanyProfileRequestDto } from './dto/companyProfile.request-dto';
import { UpdateCompanyProfileDto } from './dto/companyProfile.update-dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyProfileResponseDto } from './dto/companyProfile.response-dto';

@ApiTags('CompanyProfile')
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company profile' })
  @ApiOkResponse({ type: CompanyProfileResponseDto })
  create(@Body() companyProfileRequestDto: CompanyProfileRequestDto) {
    return this.companyProfileService.create(companyProfileRequestDto);
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
