import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dto/user.response-dto';

export class CompanyProfileResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique company profile ID (UUID)' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'ABC Corporation', description: 'Name of the company' })
  @Expose()
  company_name: string;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'Company logo (URL or file path)', required: false })
  @Expose()
  img?: string;

  @ApiProperty({ example: 'Manufacturer', description: 'Business type of the company', required: false })
  @Expose()
  business_type?: string;

  @ApiProperty({ example: 'Textiles, Apparel', description: 'Industry focus', required: false })
  @Expose()
  industry_focus?: string;

  @ApiProperty({ example: 2005, description: 'Year company was established', required: false })
  @Expose()
  year_established?: number;

  @ApiProperty({ example: 250, description: 'Total number of employees', required: false })
  @Expose()
  employee_count?: number;

  @ApiProperty({ example: 'We specialize in textile and garment manufacturing.', description: 'Company description', required: false })
  @Expose()
  description?: string;

  @ApiProperty({ example: 'https://abccorp.com', description: 'Company website URL', required: false })
  @Expose()
  website_url?: string;

  @ApiProperty({ example: 'contact@abccorp.com', description: 'Company email address' })
  @Expose()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Company phone number' })
  @Expose()
  phone: string;

  @ApiProperty({ example: '123 Main Street, New York, USA', description: 'Head office address', required: false })
  @Expose()
  address_head_office?: string;

  @ApiProperty({ example: ['Branch 1 Address', 'Branch 2 Address'], description: 'Branch office locations', required: false, type: [String] })
  @Expose()
  branch_locations?: string[];

  @ApiProperty({ example: 'John Doe', description: 'Contact person name', required: false })
  @Expose()
  contact_person_name?: string;

  @ApiProperty({ example: 'General Manager', description: 'Contact person position', required: false })
  @Expose()
  contact_person_position?: string;

  @ApiProperty({ example: 'johndoe@abccorp.com', description: 'Contact person email', required: false })
  @Expose()
  contact_person_email?: string;

  @ApiProperty({ example: '+1234567891', description: 'Contact person phone number', required: false })
  @Expose()
  contact_person_phone?: string;

  @ApiProperty({ example: { facebook: 'fb.com/abccorp', linkedin: 'linkedin.com/company/abccorp' }, description: 'Social media links', required: false })
  @Expose()
  social_links?: Record<string, string>;

  @ApiProperty({ example: ['ISO 9001', 'OEKO-TEX'], description: 'Certifications of the company', required: false, type: [String] })
  @Expose()
  certifications?: string[];

  @ApiProperty({ example: 'Knitting, Dyeing, Sewing', description: 'Production capabilities of the company', required: false })
  @Expose()
  production_capabilities?: string;

  @ApiProperty({ example: ['Textiles', 'Garments'], description: 'Product categories', required: false, type: [String] })
  @Expose()
  product_categories?: string[];

  @ApiProperty({ example: 500, description: 'Minimum order quantity (MOQ)', required: false })
  @Expose()
  minimum_order_quantity?: number;

  @ApiProperty({ example: ['USA', 'Europe', 'Asia'], description: 'Export markets', required: false, type: [String] })
  @Expose()
  export_markets?: string[];

  @ApiProperty({ example: ['English', 'Spanish'], description: 'Languages spoken by company representatives', required: false, type: [String] })
  @Expose()
  languages_spoken?: string[];

  @ApiProperty({ example: 'Mon-Fri, 9AM-6PM', description: 'Operating hours of the company', required: false })
  @Expose()
  operating_hours?: string;

  @ApiProperty({ example: 'trade_license.pdf', description: 'File path or URL of trade license document', required: false })
  @Expose()
  trade_license_file?: string;

  @ApiProperty({ description: 'User who created the company profile', type: () => UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  createdBy: UserResponseDto;

  @ApiProperty({ example: '2025-10-06T10:00:00.000Z', description: 'Date when the profile was created' })
  @Expose()
  created_at: Date;

  @ApiProperty({ example: '2025-10-06T10:00:00.000Z', description: 'Date when the profile was last updated' })
  @Expose()
  updated_at: Date;
}
