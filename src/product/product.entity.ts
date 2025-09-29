import { B2b } from "../b2b/b2b.entity";
import { SampleRequest } from "../sampleRequest/sampleRequest.entity";
import { Inquiry } from "../inquiry/inquiry.entity";
import { Category } from "../category/category.entity";
import { OrderItem } from "../orderItem/orderItem.entity";
import { Retail } from "../retail/retail.entity";
import { Rfq } from "../rfq/rfq.entity";
import { User } from "../user/user.entity";
import { Wholesale } from "../wholesale/wholesale.entity";
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

export enum productStatus {
    PUBLISH = 'publish',
    UNPUBLISH = 'unpublish'
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

    @Column({
        type: "enum",
        enum: productStatus,
        default: productStatus.PUBLISH
    })
    productStatus: productStatus;

    // ------------------- New Fields -------------------
    @Column({ nullable: true })
    productSubCategory?: string;

    @Column({ nullable: true })
    hsnCode?: string;

    @Column({ nullable: true })
    skuCode?: string;

    @Column({ nullable: true })
    materialType?: string;

    @Column({ nullable: true })
    composition?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    gsm?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    yarnCount?: string;

    @Column({ nullable: true })
    pattern?: string;

    @Column("simple-array", { nullable: true })
    certifications?: string[];

    @Column({ nullable: false })
    unitOfMeasurement: string;

    @Column({ type: "int", nullable: false })
    availableQuantity: number;

    @Column({ default: false })
    manufacturer: boolean;

    @Column({ nullable: true })
    originCountry?: string;

    @Column({ nullable: true })
    productionCapacity?: string;
    // ---------------------------------------------------

    @Column("simple-array", { nullable: true })
    additionalImages?: string[];

    @Column("simple-array", { nullable: true })
    tags?: string[];

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    weight?: number;

    @Column("simple-array", { nullable: true })
    deliveryOptions?: string[];

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    discountPrice?: number;

    @Column("simple-array", { nullable: true })
    colorVariants?: string[];

    @Column({ type: "text", nullable: true })
    returnPolicy?: string;

    @Column({ type: "text", nullable: true })
    packagingDetails?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    leadTime?: string;

    @Column({ default: false ,nullable:true})
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

    @OneToMany(() => Inquiry, (inquiry) => inquiry.product)
    inquiries: Inquiry[];

    @OneToMany(() => SampleRequest, (sampleRequest) => sampleRequest.product)
    sampleRequests: SampleRequest[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ 
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date; 
}
