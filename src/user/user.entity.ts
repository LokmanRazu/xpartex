
import { Cart } from 'src/cart/cart.entity';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import { Rfq } from 'src/rfq/rfq.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';

export enum userRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    BUYER = 'buyer'
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({
        type: 'enum',
        enum: userRole
    })
    role: userRole

    @Column()
    address: string

    @Column()
    registrationdate: Date

    @OneToOne(() => Cart, (cart) => cart.user, {
        cascade: true,
    })
    cart: Cart;

    @OneToMany(() => Product, (product) => product.seller, {
        cascade: true,
    })
    product: Product[];

    @OneToMany(() => Rfq, (rfq) => rfq.buyer, {
        cascade: true,
    })
    rfq: Rfq[];

    @OneToOne(()=> Order,(order)=>order.user,{cascade:true})
    order:Order



    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}