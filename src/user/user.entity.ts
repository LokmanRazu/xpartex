
import { BidOffer } from '../bidOffer/bidOffer.entity';
import { Cart } from '../cart/cart.entity';
import { Inquiry } from '../inquiry/inquiry.entity';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { SampleRequest } from '../sampleRequest/sampleRequest.entity';
import { Rfq } from './../rfq/rfq.entity';
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
    rfqForBuyer: Rfq[];

    @OneToMany(() => Rfq, (rfq) => rfq.rfqBySeller, {
        cascade: true,
    })
    rfqfromSeller: Rfq[];

    @OneToOne(() => Order, (order) => order.user, { cascade: true })
    order: Order

    @OneToMany(() => BidOffer, (bidOffer) => bidOffer.seller, { cascade: true })
    bids: BidOffer[]


    @OneToMany(() => Inquiry, (inquiry) => inquiry.buyer, { cascade: true })
    inquiryes: Inquiry[] 

    @OneToMany(() => SampleRequest, (sampleRequest) => sampleRequest.buyer, { cascade: true })
    sampleRequestBuyer: SampleRequest[] 


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}