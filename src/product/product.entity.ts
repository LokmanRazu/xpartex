import { B2b } from "src/b2b/b2b.entity";
import { Category } from "src/category/category.entity";
import { OrderItem } from "src/orderItem/orderItem.entity";
import { Retail } from "src/retail/retail.entity";
import { Rfq } from "src/rfq/rfq.entity";
import { User } from "src/user/user.entity";
import { Wholesale } from "src/wholesale/wholesale.entity";
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

export enum productType {
  WHOLESALE = "wholesale",
  RETAIL = "retail",
  B2B = "b2b",
}

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  img: string;

  @ManyToOne(() => User, (user) => user.product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sellerId" })
  seller: User;

  @ManyToOne(() => Category, (category) => category.product, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Column()
  price: string;

  @Column()
  stockQuantity: number;

  @Column()
  productDescription: string;

  @Column({
    type: "enum",
    enum: productType,
  })
  productType: productType;

  // ------------------- New Fields -------------------
  @Column("simple-array", { nullable: true })
  additionalImages?: string[]; // Multiple images

  @Column("simple-array", { nullable: true })
  tags?: string[]; // Tags like ["electronics","phone","new"]

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  weight?: number; // Weight in KG or grams

  @Column("simple-array", { nullable: true })
  deliveryOptions?: string[]; // ["Home Delivery","Pickup"]

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  discountPrice?: number;

  @Column("simple-array", { nullable: true })
  colorVariants?: string[]; // ["Black","Red","Blue"]

  @Column({ type: "text", nullable: true })
  returnPolicy?: string;

  @Column({ type: "text", nullable: true })
  packagingDetails?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  leadTime?: string; // e.g. "7-10 days"

  @Column({ default: false })
  negotiablePrice?: boolean;

  @Column({ default: false })
  sampleAvailability?: boolean;

  @Column({ default: false })
  customBiddingOption?: boolean;
  // ---------------------------------------------------

  @OneToMany(() => OrderItem, (orderitem) => orderitem.product, {
    cascade: true,
  })
  orderitem: OrderItem;

  @OneToMany(() => Rfq, (rfq) => rfq.product, {
    cascade: true,
  })
  rfq: Rfq;

  @OneToMany(() => Wholesale, (wholesale) => wholesale.product, {
    cascade: true,
  })
  wholesales?: Wholesale;

  @OneToMany(() => Retail, (retail) => retail.product, {
    cascade: true,
  })
  retails?: Retail;

  @OneToMany(() => B2b, (b2b) => b2b.product, {
    cascade: true,
  })
  b2bs?: B2b;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
