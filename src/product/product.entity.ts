import { B2b } from "src/b2b/b2b.entity";
import { Category } from "src/category/category.entity";
import { OrderItem } from "src/orderItem/order-item.entity";
import { Retail } from "src/retail/retail.entity";
import { Wholesale } from "src/wholesale/wholesale.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    img: string;

    @Column()
    sellerId: string

    @ManyToOne(() => Category, (category) => category.product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @Column()
    price: string

    @Column()
    stockQuantity: number

    @Column()
    description: string


    @OneToMany(() => OrderItem, (orderitem) => orderitem.product, {
        cascade: true,
    })
    orderitem: OrderItem[];


    @OneToMany(() => Wholesale, (wholesale) => wholesale.product, {
        cascade: true,
    })
    wholesales?: Wholesale[];

    @OneToMany(() => Retail, (retail) => retail.product, {
        cascade: true,
    })
    retails?: Retail[];

    @OneToMany(() => B2b, (b2b) => b2b.product, {
        cascade: true,
    })
    b2bs?: B2b[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;



}