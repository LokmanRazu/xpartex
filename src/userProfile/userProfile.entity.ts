import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 36, nullable: true })
    username: string;

    @Column({ type: 'varchar', length: 36, unique: true })
    email: string;

    @Column({ type: 'int', nullable: true })
    phone: number;

    @Column({ nullable: true })
    img: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    city?: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    state?: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    postalCode?: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    industrySegment: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    country?: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    nationality?: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    title?: string;

    @Column({ type: 'varchar', nullable: true })
    experience?: string;

    // Additional Info
    @Column({ type: 'enum', enum: Gender, nullable: true },)
    gender?: Gender;

    @Column({ type: 'date', nullable: true })
    dateOfBirth: Date;

    @Column({ nullable: true })
    bio?: string;

    @Column({ type: "simple-array", nullable: true })
    skills?: string[];

    @Column({ type: "simple-array", nullable: true })
    languages?: string[];

    @Column({ nullable: true })
    website?: string;

    @Column({ nullable: true })
    socialLinks?: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    preferredWorkLocation?: string;

    @Column({ type: 'varchar', length: 56, nullable: true })
    connectionPreference?: string;


    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "userId" })
    user: User;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
