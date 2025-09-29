import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Rfq } from '../rfq/rfq.entity';

export enum BidStatus {
    OPEN = 'open',
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}


@Entity('bids')
export class BidOffer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Rfq, (rfq) => rfq.bids, { onDelete: 'CASCADE' })
    rfq: Rfq;

    @ManyToOne(() => User, (user) => user.bids, { onDelete: 'CASCADE' })
    seller: User;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    deliveryTime: string;

    @Column({
        type: 'enum',
        enum: BidStatus,
        default: BidStatus.OPEN,
    })
    status: BidStatus;
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'int', default: 0 })
    updateCount: number; // track how many times updated
}
