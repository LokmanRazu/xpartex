import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyProfile } from './companyProfile.entity';
import { CompanyProfileResponseDto } from './dto/companyProfile.response-dto';
import { plainToInstance } from 'class-transformer';
import { CompanyProfileRequestDto } from './dto/companyProfile.request-dto';
import { UpdateCompanyProfileDto } from './dto/companyProfile.update-dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(CompanyProfile)
    private companyProfileRepository: Repository<CompanyProfile>,
    private userService: UserService,
  ) {}

  async create(dto: CompanyProfileRequestDto): Promise<CompanyProfileResponseDto> {
    try {
      const user = await this.userService.findOne(dto.createdBy);
      if (!user) throw new NotFoundException('User not found');

      const companyProfile = this.companyProfileRepository.create({
        ...dto,
        createdBy: { id: dto.createdBy } as User,
      });

      const savedCompanyProfile = await this.companyProfileRepository.save(companyProfile);

      return plainToInstance(CompanyProfileResponseDto, savedCompanyProfile, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create company profile: ' + error.message,
      );
    }
  }

  async findAll(): Promise<CompanyProfileResponseDto[]> {
    try {
      const companyProfiles = await this.companyProfileRepository.find({
        relations: ['createdBy'],
      });
      return plainToInstance(CompanyProfileResponseDto, companyProfiles, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch company profiles');
    }
  }

  async findOne(id: string): Promise<CompanyProfileResponseDto> {
    try {
      const companyProfile = await this.companyProfileRepository.findOne({
        where: { id },
        relations: ['createdBy'],
      });
      if (!companyProfile) throw new NotFoundException('Company profile not found');

      return plainToInstance(CompanyProfileResponseDto, companyProfile, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch company profile');
    }
  }

  async update(id: string, dto: UpdateCompanyProfileDto): Promise<CompanyProfileResponseDto> {
    try {
      const companyProfile = await this.companyProfileRepository.findOne({ where: { id } });
      if (!companyProfile) throw new NotFoundException('Company profile not found');

      Object.assign(companyProfile, dto);

      const updatedCompanyProfile = await this.companyProfileRepository.save(companyProfile);
      return plainToInstance(CompanyProfileResponseDto, updatedCompanyProfile, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update company profile');
    }
  }

  async delete(id: string): Promise<CompanyProfileResponseDto> {
    try {
      const companyProfile = await this.companyProfileRepository.findOne({ where: { id } });
      if (!companyProfile) throw new NotFoundException('Company profile not found');

      await this.companyProfileRepository.delete(id);
      return plainToInstance(CompanyProfileResponseDto, companyProfile, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete company profile');
    }
  }
}
