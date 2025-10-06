import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { OrderItem } from "../orderItem/orderItem.entity";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";
import { Payment } from "../payment/payment.entity";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "buyerId" })
  user: User;

  @ManyToOne(() => Product, (product) => product.orderitem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "int" })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @OneToMany(() => Payment, (payment) => payment.order, { cascade: true })
  payments: Payment[];

  // @OneToMany(() => OrderItem, (orderItems) => orderItems.order, { cascade: true })
  // orderItems: OrderItem[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
