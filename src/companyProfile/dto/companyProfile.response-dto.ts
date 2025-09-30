import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dto/user.response-dto';

export class CompanyProfileResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  bio: string;

  @Expose()
  img: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  website: string;

  @Expose()
  address: string;

  @Expose()
  city: string;

  @Expose()
  country: string;

  @Expose()
  industry: string;

  @Expose()
  employeeCount: string;

  @Expose()
  productionCapacity: string;

  @Expose()
  @Type(() => UserResponseDto)
  createdBy: UserResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
