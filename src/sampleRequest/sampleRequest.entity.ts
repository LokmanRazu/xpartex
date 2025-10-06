import { Product } from '../product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class SampleRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  color?: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  shippingAddress: string;

  @ManyToOne(() => User, (user) => user.sampleRequestBuyer,{onDelete:'CASCADE'})
  @JoinColumn({ name: "buyerId" })
  buyer: User;

  @ManyToOne(() => Product, (product) => product.sampleRequests,{onDelete:'CASCADE'})
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
