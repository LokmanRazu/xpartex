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
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { Cart } from "../cart/cart.entity";
import { CompanyProfile } from "../companyProfile/companyProfile.entity";
import { SubCategory } from "../subCategory/subCategory.entity";

// export enum ListingType {
//     B2B = "b2b",
//     WHOLESALE = "wholesale",
//     RETAIL = "retail",
// }

// export enum paymentTerms {
//     COD = 'cod',
//     ONLINE = 'online',
//     BANKTRANSFER = 'banktransfer'
// }

@Entity("product")
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @ManyToOne(() => User, (user) => user.product, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sellerId" })
    seller: User;

    @ManyToOne(() => CompanyProfile, (companyProfile) => companyProfile.product, { onDelete: "CASCADE", })
    @JoinColumn({ name: "companyProfileId" })
    company: CompanyProfile;

    @ManyToOne(() => Category, (category) => category.product, { onDelete: "CASCADE", })
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.product, { onDelete: "CASCADE", })
    @JoinColumn({ name: "subCategoryId" })
    subCategory: SubCategory;

    @Column({ type: "int", nullable: true })
    price: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    img: string;

    @Column({ type: "simple-array", nullable: true })
    additional_images?: string[];

    @Column({ type: "varchar", length: 255, nullable: true })
    video?: string;

    @Column({ nullable: true })
    hs_code: string;

    // @Column({ type: "enum", enum: ListingType })
    // listing_type: ListingType;

    @Column("simple-array", { nullable: true })
    tags?: string[];

    @Column({ type: "varchar", length: 255, nullable: true })
    brand_name?: string;

    @Column({ type: "varchar", length: 250, nullable: true, })
    description?: string;

    @Column({ type: "varchar", length: 250, nullable: true })
    key_features?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    origin_country?: string;

    @Column({ type: "text", nullable: true })
    certifications?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    material_type?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    usage_application?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    price_unit?: string;

    @Column({ type: "simple-array", nullable: true })
    payment_terms?: string[];

    @Column({ type: "text", nullable: true })
    packaging_details?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    delivery_terms?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    trade_terms?: string;

    @Column({ type: "text", nullable: true })
    return_policy?: string;

    @Column({ type: "text", nullable: true })
    warranty?: string;

    @Column({ type: "int", nullable: true })
    stock_quantity?: number;

    @Column("simple-array", { nullable: true })
    colorVariants?: string[];

    @Column({ type: "simple-array", nullable: true })
    available_sizes?: string[];

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    price_per_unit?: number;

    @Column({ type: "varchar", length: 100, nullable: true })
    shipping_time?: Date;

    @Column("simple-array", { nullable: true })
    shipping_methods: string[]

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    shipping_cost: number;

    @Column({ type: "varchar", length: 100, nullable: true })
    port_of_shipment: string

    @Column({ type: 'json', nullable: true })
    tier_pricing?: { range: string; price: number }[];

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @Column({ type: "boolean", default: false })
    is_b2b: boolean;

    @Column({ type: "boolean", default: false })
    is_wholesale: boolean;

    @Column({ type: "boolean", default: false })
    is_retail: boolean;

    @Column({ type: "int", nullable: true })
    moq: number;

    @Column({ type: "boolean", default: false, nullable: true })
    sample_availability: boolean

    @Column({ type: "varchar", length: 100, nullable: true })
    supply_ablity: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    lead_time: string

    @Column({ type: "varchar", length: 100, nullable: true })
    sample_cost: string

    @Column({ type: "boolean", default: false, nullable: true })
    customization_vailability: boolean

    @Column({ type: "varchar", length: 100, nullable: true })
    customization_type: string


    // Relations (same as before)
    @OneToMany(() => Cart, (cart) => cart.product, { cascade: true })
    cart: Cart;

    @OneToMany(() => OrderItem, (orderitem) => orderitem.product, {
        cascade: true,
    })
    orderitem: OrderItem;

    @OneToMany(() => Rfq, (rfq) => rfq.product, { cascade: true })
    rfq: Rfq;

    @OneToMany(() => Wholesale, (wholesale) => wholesale.product, {
        cascade: true,
    })
    wholesales?: Wholesale[];

    @OneToMany(() => Retail, (retail) => retail.product, {
        cascade: true,
    })
    retails?: Retail[];

    @OneToMany(() => B2b, (b2b) => b2b.product, { cascade: true })
    b2bs?: B2b[];

    @OneToMany(() => Inquiry, (inquiry) => inquiry.product, { cascade: true })
    inquiries: Inquiry[];

    @OneToMany(() => SampleRequest, (sampleRequest) => sampleRequest.product, { cascade: true })
    sampleRequests: SampleRequest[];

    // Timestamps
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", })
    updated_at: Date;
}

