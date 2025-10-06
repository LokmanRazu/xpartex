import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CompanyProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ nullable: true })
  img: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  industry: string;

  @Column()
  employeeCount: string;

  @Column()
  productionCapacity: string;

  @ManyToOne(() => User, (user) => user.companyProfiles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
