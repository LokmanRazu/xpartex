import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dto/user.response-dto';
import { ProductResponseDto } from '../../product/dto/product.response-dto';
import { CompanyBusineesType } from '../companyProfile.entity';

export class CompanyProfileResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique company profile ID (UUID)',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'ABC Corporation', description: 'Name of the company' })
  @Expose()
  company_name: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'Company logo (URL or file path)',
  })
  @Expose()
  img?: string;

  @ApiProperty({
    example: CompanyBusineesType.MANUFACTURER,
    enum: CompanyBusineesType,
    description: 'Type of business',
  })
  @Expose()
  business_type: CompanyBusineesType;

  @ApiPropertyOptional({
    example: 'Textiles, Apparel',
    description: 'Industry focus',
  })
  @Expose()
  industry_focus?: string;

  @ApiPropertyOptional({
    example: 2005,
    description: 'Year company was established',
  })
  @Expose()
  year_established?: number;

  @ApiPropertyOptional({
    example: 250,
    description: 'Total number of employees',
  })
  @Expose()
  employee_count?: number;

  @ApiPropertyOptional({
    example: 'We specialize in textile and garment manufacturing.',
    description: 'Company description',
  })
  @Expose()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://abccorp.com',
    description: 'Company website URL',
  })
  @Expose()
  website_url?: string;

  @ApiProperty({
    example: 'contact@abccorp.com',
    description: 'Company email address',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Company phone number',
  })
  @Expose()
  phone: string;

  @ApiPropertyOptional({
    example: '123 Main Street, New York, USA',
    description: 'Head office address',
  })
  @Expose()
  address_head_office?: string;

  @ApiPropertyOptional({
    example: ['Branch 1 Address', 'Branch 2 Address'],
    description: 'Branch office locations',
    type: [String],
  })
  @Expose()
  branch_locations?: string[];

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Contact person name',
  })
  @Expose()
  contact_person_name?: string;

  @ApiPropertyOptional({
    example: 'General Manager',
    description: 'Contact person position',
  })
  @Expose()
  contact_person_position?: string;

  @ApiPropertyOptional({
    example: 'johndoe@abccorp.com',
    description: 'Contact person email',
  })
  @Expose()
  contact_person_email?: string;

  @ApiPropertyOptional({
    example: '+1234567891',
    description: 'Contact person phone number',
  })
  @Expose()
  contact_person_phone?: string;

  @ApiPropertyOptional({
    example: { facebook: 'fb.com/abccorp', linkedin: 'linkedin.com/company/abccorp' },
    description: 'Social media links',
  })
  @Expose()
  social_links?: Record<string, string>;

  @ApiPropertyOptional({
    example: ['ISO 9001', 'OEKO-TEX'],
    description: 'Certifications of the company',
    type: [String],
  })
  @Expose()
  certifications?: string[];

  @ApiPropertyOptional({
    example: 'Knitting, Dyeing, Sewing',
    description: 'Production capabilities of the company',
  })
  @Expose()
  production_capabilities?: string;

  @ApiPropertyOptional({
    example: ['Textiles', 'Garments'],
    description: 'Product categories',
    type: [String],
  })
  @Expose()
  product_categories?: string[];

  @ApiPropertyOptional({
    example: 500,
    description: 'Minimum order quantity (MOQ)',
  })
  @Expose()
  minimum_order_quantity?: number;

  @ApiPropertyOptional({
    example: ['USA', 'Europe', 'Asia'],
    description: 'Export markets',
    type: [String],
  })
  @Expose()
  export_markets?: string[];

  @ApiPropertyOptional({
    example: ['English', 'Spanish'],
    description: 'Languages spoken by company representatives',
    type: [String],
  })
  @Expose()
  languages_spoken?: string[];

  @ApiPropertyOptional({
    example: 'Mon-Fri, 9AM-6PM',
    description: 'Operating hours of the company',
  })
  @Expose()
  operating_hours?: string;

  @ApiPropertyOptional({
    example: 'trade_license.pdf',
    description: 'File path or URL of trade license document',
  })
  @Expose()
  trade_license_file?: string;

  @ApiProperty({
    description: 'User who created the company profile',
    type: () => UserResponseDto,
  })
  @Expose()
  @Type(() => UserResponseDto)
  createdBy: UserResponseDto;

  @ApiPropertyOptional({
    description: 'List of products associated with the company',
    type: () => [ProductResponseDto],
  })
  @Expose()
  @Type(() => ProductResponseDto)
  product?: ProductResponseDto[];

  @ApiProperty({
    example: '2025-10-06T10:00:00.000Z',
    description: 'Date when the profile was created',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    example: '2025-10-06T10:00:00.000Z',
    description: 'Date when the profile was last updated',
  })
  @Expose()
  updated_at: Date;
}
