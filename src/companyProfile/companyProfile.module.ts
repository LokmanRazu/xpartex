import { Module } from '@nestjs/common';
import { CompanyProfileController } from './companyProfile.controller';
import { CompanyProfileService } from './companyProfile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfile } from './companyProfile.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyProfile]), UserModule],
  controllers: [CompanyProfileController],
  providers: [CompanyProfileService],
  exports: [CompanyProfileService],
})
export class CompanyProfileModule {}
