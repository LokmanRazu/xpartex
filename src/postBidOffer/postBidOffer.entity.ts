import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Buyerpost } from '../buyerPost/buyerPost.entity';
import { User } from '../user/user.entity';

export enum BidOfferStatus {
  OPEN = 'open',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity()
export class PostBidOffer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'date' })
  delivaryTime: Date;

  @Column('simple-array')
  shippingMetode: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  attachment: string;

  @Column({  type: 'enum',enum: BidOfferStatus, default: BidOfferStatus.OPEN})
  status: BidOfferStatus;

  @ManyToOne(() => Buyerpost, (buyerpost) => buyerpost.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buyerPostId' })
  buyerPost: Buyerpost;

  @ManyToOne(() => User, (user) => user.postBidOffers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bidderId' })
  bidder: User;

  @ManyToOne(() => User, (user) => user.postBidOffersbuyer, { onDelete: 'CASCADE' , nullable: true })
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @Column({ type: 'varchar',length: 30, nullable: true })
  oldBidId:string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
