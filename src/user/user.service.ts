import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserResponseDto, UserResponseWithPasswordDto } from './dto/user.response-dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/user.request-dto';
import { hashPassword } from 'utils/utils';
import { UpdateUserDto } from './dto/user.update-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userRepository.find();
      return plainToInstance(UserResponseDto, users, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');

      return plainToInstance(UserResponseDto, user, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch user');
    }
  }

  async findOneByEmail(email: string): Promise<UserResponseWithPasswordDto> {
  try {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email');

    return plainToInstance(UserResponseWithPasswordDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  } catch (error) {
    if (error instanceof UnauthorizedException || error instanceof NotFoundException) {
      throw error; // rethrow as-is
    }
    throw new InternalServerErrorException('Failed to fetch user by email');
  }
}


  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const { firstName, lastName, email, password, phoneNumber, role, address, registrationdate } = dto;

      const user = this.userRepository.create({
        firstName,
        lastName,
        email,
        password: hashPassword(password), // always hash before saving
        phoneNumber,
        role,
        address,
        registrationdate,
      });

      const savedUser = await this.userRepository.save(user);

      return plainToInstance(UserResponseDto, savedUser, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    try {
      await this.userRepository.update(id, dto);
      const updatedUser = await this.userRepository.findOne({ where: { id } });

      if (!updatedUser) throw new NotFoundException('User not found after update');

      return plainToInstance(UserResponseDto, updatedUser, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update user');
    }
  }

  async delete(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } }); 
      if (!user) throw new NotFoundException('User not found');

      await this.userRepository.delete(id);

      return plainToInstance(UserResponseDto, user, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete user');
    }
  }
}
