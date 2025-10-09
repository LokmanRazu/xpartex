import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsObject,
} from 'class-validator';
import { CompanyBusineesType } from '../companyProfile.entity';

export class CompanyProfileRequestDto {
  @ApiProperty({ example: 'ABC Corporation', description: 'Name of the company' })
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png', description: 'URL or path of the company logo', format: 'binary' })
  @IsString()
  @IsOptional()
  img?: string;

  @ApiProperty({
    example: CompanyBusineesType.MANUFACTURER,
    enum: CompanyBusineesType,
    description: 'Type of business',
  })
  @IsEnum(CompanyBusineesType)
  @IsNotEmpty()
  business_type: CompanyBusineesType;

  @ApiPropertyOptional({ example: 'Textiles, Apparel', description: 'Industry focus of the company' })
  @IsString()
  @IsOptional()
  industry_focus?: string;

  @ApiPropertyOptional({ example: 2005, description: 'Year the company was established' })
  @IsInt()
  @IsOptional()
  year_established?: number;

  @ApiPropertyOptional({ example: 250, description: 'Number of employees' })
  @IsInt()
  @IsOptional()
  employee_count?: number;

  @ApiPropertyOptional({ example: 'We specialize in high-quality textile production.', description: 'Company description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'https://abccorp.com', description: 'Company website URL' })
  @IsString()
  @IsOptional()
  website_url?: string;

  @ApiProperty({ example: 'contact@abccorp.com', description: 'Company email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Company phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: '123 Main St, Anytown, USA', description: 'Head office address' })
  @IsString()
  @IsOptional()
  address_head_office?: string;

  @ApiPropertyOptional({ example: ['Branch 1 Address', 'Branch 2 Address'], description: 'Branch office locations' })
  @IsArray()
  @IsOptional()
  branch_locations?: string[];

  @ApiPropertyOptional({ example: 'John Doe', description: 'Contact person name' })
  @IsString()
  @IsOptional()
  contact_person_name?: string;

  @ApiPropertyOptional({ example: 'General Manager', description: 'Contact person position' })
  @IsString()
  @IsOptional()
  contact_person_position?: string;

  @ApiPropertyOptional({ example: 'johndoe@abccorp.com', description: 'Contact person email' })
  @IsEmail()
  @IsOptional()
  contact_person_email?: string;

  @ApiPropertyOptional({ example: '+1234567891', description: 'Contact person phone number' })
  @IsString()
  @IsOptional()
  contact_person_phone?: string;

  @ApiPropertyOptional({
    example: { facebook: 'fb.com/abccorp', linkedin: 'linkedin.com/company/abccorp' },
    description: 'Social media links',
  })
  @IsObject()
  @IsOptional()
  social_links?: Record<string, string>;

  @ApiPropertyOptional({ example: ['ISO 9001', 'OEKO-TEX'], description: 'Certifications held by the company' })
  @IsArray()
  @IsOptional()
  certifications?: string[];

  @ApiPropertyOptional({ example: 'Knitting, Dyeing, Sewing', description: 'Production capabilities' })
  @IsString()
  @IsOptional()
  production_capabilities?: string;

  @ApiPropertyOptional({ example: ['Textiles', 'Garments'], description: 'Product categories' })
  @IsArray()
  @IsOptional()
  product_categories?: string[];

  @ApiPropertyOptional({ example: 500, description: 'Minimum order quantity (MOQ)' })
  @IsInt()
  @IsOptional()
  minimum_order_quantity?: number;

  @ApiPropertyOptional({ example: ['USA', 'Europe', 'Asia'], description: 'Export markets' })
  @IsArray()
  @IsOptional()
  export_markets?: string[];

  @ApiPropertyOptional({ example: ['English', 'Spanish'], description: 'Languages spoken' })
  @IsArray()
  @IsOptional()
  languages_spoken?: string[];

  @ApiPropertyOptional({ example: 'Mon-Fri, 9AM-6PM', description: 'Operating hours' })
  @IsString()
  @IsOptional()
  operating_hours?: string;

  @ApiPropertyOptional({ example: 'trade_license.pdf', description: 'File path or URL of trade license document', format: 'binary' })
  @IsString()
  @IsOptional()
  trade_license_file?: string;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab', description: 'ID of the user creating the profile' })
  @IsUUID()
  @IsNotEmpty()
  createdBy: string;
}
