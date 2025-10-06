import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';

import { ProfileService } from './userProfile.service';
import { ProfileRequestDto } from './dto/userProfile.request-dto';
import { ProfileResponseDto } from './dto/userProfile.response-dto';
import { UpdateProfileDto } from './dto/userProfile.update-dto';
import { AuthGuard } from '@nestjs/passport';
import { MultiFileUploadInterceptor } from '../../utils/imageUpload';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new profile' })
//   @ApiResponse({ status: 201, description: 'Profile created', type: ProfileResponseDto })
// //   async create(@Body() dto: ProfileRequestDto): Promise<ProfileResponseDto> {
// //     return this.profileService.create(dto);
// //   }

  @Get()
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({ status: 200, description: 'List of profiles', type: [ProfileResponseDto] })
  async findAll(): Promise<ProfileResponseDto[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a profile by ID' })
  @ApiParam({ name: 'id', description: 'Profile ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Profile found', type: ProfileResponseDto })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async findOne(@Param('id') id: string): Promise<ProfileResponseDto> {
    return this.profileService.findOne(id);
  }

  @Get('userProfile/:id')
  @ApiOperation({ summary: 'Get a profile by user ID' })
  @ApiResponse({ status: 200, description: 'Profile found', type: ProfileResponseDto })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async findByUserId(@Req() req) {
    return this.profileService.findByUserId(req.user.id);
  }

@Patch(':id')
@ApiConsumes('multipart/form-data')
@UseInterceptors(
  MultiFileUploadInterceptor([{ name: 'img', maxCount: 1 }]),
)
@ApiOperation({ summary: 'Update a profile (partial update)' })
@ApiParam({ name: 'id', description: 'Profile ID (UUID)' })
@ApiResponse({ status: 200, description: 'Profile updated', type: ProfileResponseDto })
@ApiResponse({ status: 404, description: 'Profile not found' })
async update(
  @Param('id') id: string,
  @Body() dto: UpdateProfileDto,
  @UploadedFiles() files: { img?: Express.Multer.File[] },
): Promise<ProfileResponseDto> {
  return this.profileService.update(id, dto, files);
}


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a profile' })
  @ApiParam({ name: 'id', description: 'Profile ID (UUID)' })
  @ApiResponse({ status: 204, description: 'Profile deleted' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.profileService.delete(id);
  }
}
