import { BidOffer } from "../bidOffer/bidOffer.entity";
import { Product } from "../product/product.entity";
import { User } from "..//user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum RfqStatus {
  OPEN = "open",
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

@Entity("rfq")
export class Rfq {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  title: string;

  @Column({ type: 'enum', enum: RfqStatus, default: RfqStatus.OPEN })
  status: RfqStatus;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "varchar", length: 50 })
  unit: string;

  @Column({ type: "varchar" })
  leadTime: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  file?: string;

  @Column({ type: "varchar", length: 100 })
  region: string;

  @ManyToOne(() => User, (user) => user.rfqForBuyer, { onDelete: "CASCADE" })
  @JoinColumn({ name: "buyerId" })
  buyer: User;

  @ManyToOne(() => User, (user) => user.rfqfromSeller, { onDelete: "CASCADE" })
  @JoinColumn({ name: "rfqBySellerId" })
  rfqBySeller: User;

  @ManyToOne(() => Product, (product) => product.orderitem, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product: Product;

  @OneToMany(() => BidOffer, (bidOffer) => bidOffer.rfq)
  bids: BidOffer[];

  // ✅ New required fields
  @Column({ type: "varchar", length: 255 })
  deliveryTerms: string;

  @Column({ type: "varchar", length: 255 })
  paymentTerms: string;

  @Column({ type: "varchar", length: 100 })
  warrantyPeriod: string;

  @Column({ type: "varchar", length: 10 })
  currency: string;

  @Column({ type: "varchar", length: 255 })
  shippingAddress: string;

  // ✅ Only optional field
  @Column({ type: "text", nullable: true })
  specialInstructions?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
