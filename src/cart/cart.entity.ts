import { User } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartItem } from "../cartItem/cartItem.entity";
import { Product } from "../product/product.entity";

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Product, (product) => product.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  // @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  // cartItems: CartItem[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', 
  })
  updated_at: Date;
}