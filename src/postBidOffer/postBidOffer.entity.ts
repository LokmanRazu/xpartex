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

  @ManyToOne(() => Buyerpost, (buyerpost) => buyerpost.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buyerPostId' })
  buyerPost: Buyerpost;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bidderId' })
  bidder: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
