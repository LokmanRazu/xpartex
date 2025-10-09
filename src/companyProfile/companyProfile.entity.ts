import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CompanyBusineesType {
  MANUFACTURER = 'manufacturer',
  DISTRIBUTOR = 'distributor',
  Supplier = 'supplier',
}

@Entity()
export class CompanyProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar',length: 255, nullable: false})
  company_name: string;

  @Column({ type: 'text', nullable: true })
  img: string;

  @Column({type: 'enum', enum: CompanyBusineesType, nullable: false })
  business_type: CompanyBusineesType;

  @Column({type: 'varchar',length: 255, nullable: true })
  industry_focus: string;

  @Column({ type: 'int', nullable: true })
  year_established: number;

  @Column({ type: 'int', nullable: true })
  employee_count: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({type: 'varchar',length: 100, nullable: true })
  website_url: string;

  @Column({type: 'varchar',length: 100, nullable: true})
  email: string;

  @Column({type: 'varchar',length: 100, nullable: true})
  phone: string;

  @Column({ type: 'text', nullable: true })
  address_head_office: string;

  @Column({ type: 'simple-json', nullable: true })
  branch_locations: string[]; // JSON/Array

  @Column({type: 'varchar',length: 100, nullable: true })
  contact_person_name: string;

  @Column({type: 'varchar',length: 100, nullable: true })
  contact_person_position: string;

  @Column({type: 'varchar',length: 100, nullable: true })
  contact_person_email: string;

  @Column({type: 'varchar',length: 100, nullable: true })
  contact_person_phone: string;

  @Column({ type: 'simple-json', nullable: true })
  social_links: Record<string, string>; // facebook, linkedin, etc.

  @Column({ type: 'simple-json', nullable: true })
  certifications: string[]; // JSON/Array

  @Column({ type: 'text', nullable: true })
  production_capabilities: string;

  @Column({ type: 'simple-json', nullable: true })
  product_categories: string[]; // JSON/Array

  @Column({ type: 'int', nullable: true })
  minimum_order_quantity: number;

  @Column({ type: 'simple-json', nullable: true })
  export_markets: string[];

  @Column({ type: 'simple-json', nullable: true })
  languages_spoken: string[];

  @Column({type: 'varchar',length: 100, nullable: true })
  operating_hours: string;

  @Column({ type: 'text', nullable: true })
  trade_license_file: string;

  @ManyToOne(() => User, (user) => user.companyProfiles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

   @OneToMany(() => Product, (product) => product.company, { cascade: true })
   product: Product[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
