import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from '../user/user.entity';
import { Profile } from './userProfile.entity';
import { ProfileRequestDto } from './dto/userProfile.request-dto';
import { ProfileResponseDto } from './dto/userProfile.response-dto';
import { UpdateProfileDto } from './dto/userProfile.update-dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) { }

    async create(firstName, lastName, email, phone, id): Promise<ProfileResponseDto> {

        // let user =   await this.userService.findOne(id);
        // if (!user) throw new NotFoundException('User not found');
        try {
            const profile = this.profileRepository.create({
                username: `${firstName} ${lastName}`,
                email: email,
                phone: phone,
                user: { id } as User, // link to user
            });

            const savedProfile = await this.profileRepository.save(profile);

            return plainToInstance(ProfileResponseDto, savedProfile, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to create profile: ' + error.message,
            );
        }
    }

    async findAll(): Promise<ProfileResponseDto[]> {
        try {
            const profiles = await this.profileRepository.find({
                relations: ['user'],
            });

            return plainToInstance(ProfileResponseDto, profiles, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch {
            throw new InternalServerErrorException('Failed to fetch profiles');
        }
    }

    async findOne(id: string): Promise<ProfileResponseDto> {
        try {
            const profile = await this.profileRepository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (!profile) throw new NotFoundException('Profile not found');

            return plainToInstance(ProfileResponseDto, profile, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to fetch profile');
        }
    }

    async update(id: string, dto: UpdateProfileDto): Promise<ProfileResponseDto> {
        try {
            const profile = await this.profileRepository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (!profile) throw new NotFoundException('Profile not found');

            if (dto.userId) {
                profile.user = { id: dto.userId } as User;
            }

            Object.assign(profile, dto);

            const updatedProfile = await this.profileRepository.save(profile);

            return plainToInstance(ProfileResponseDto, updatedProfile, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to update profile');
        }
    }

    async delete(id: string): Promise<ProfileResponseDto> {
        try {
            const profile = await this.profileRepository.findOne({ where: { id } });
            if (!profile) throw new NotFoundException('Profile not found');

            await this.profileRepository.delete(id);

            return plainToInstance(ProfileResponseDto, profile, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to delete profile');
        }
    }
}
