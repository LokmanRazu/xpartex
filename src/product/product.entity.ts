import { B2b } from "src/b2b/b2b.entity";
import { Category } from "src/category/category.entity";
import { OrderItem } from "src/orderItem/orderItem.entity";
import { Retail } from "src/retail/retail.entity";
import { Rfq } from "src/rfq/rfq.entity";
import { User } from "src/user/user.entity";
import { Wholesale } from "src/wholesale/wholesale.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum productType{
    WHOLESALE='wholesale',
    RETAIL='retail',
    B2B = 'b2b'
}

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    img: string;

    @ManyToOne(() => User, (user) => user.product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "sellerId" })
    seller: User;

    @ManyToOne(() => Category, (category) => category.product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @Column()
    price: string

    @Column()
    stockQuantity: number

    @Column()
    productDescription: string

    
    @Column({
        type: 'enum',
        enum: productType,
    })
    productType: productType;


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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;



}