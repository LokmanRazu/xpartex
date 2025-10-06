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
export class Inquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;
   
  @Column()
  quantity: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  attachment: string;

  @ManyToOne(() => Product, (product) => product.inquiries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "productId" })
  product: Product;

  @ManyToOne(() => User, (user) => user.inquiryes, { onDelete: 'CASCADE' }  )
  @JoinColumn({ name: "buyerId" })
  buyer: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
