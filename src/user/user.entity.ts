
import { BidOffer } from '../bidOffer/bidOffer.entity';

import { Cart } from '../cart/cart.entity';

import { Inquiry } from '../inquiry/inquiry.entity';

import { Order } from '../order/order.entity';

import { Product } from '../product/product.entity';

import { SampleRequest } from '../sampleRequest/sampleRequest.entity';

import { Profile } from '../userProfile/userProfile.entity';

import { CompanyProfile } from '../companyProfile/companyProfile.entity';

import { Rfq } from './../rfq/rfq.entity';

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';

import { Buyerpost } from '../buyerPost/buyerPost.entity';

import { PostBidOffer } from '../postBidOffer/postBidOffer.entity';



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



    @OneToMany(() => Buyerpost, (buyerpost) => buyerpost.user, {

        cascade: true,

    })

    buyerpost: Buyerpost



    @OneToMany(() => Cart, (cart) => cart.user, {

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



    @OneToOne(() => Order, (order) => order.user, { cascade: true })

    order: Order



    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })

    profile: Profile



    @OneToMany(() => BidOffer, (bidOffer) => bidOffer.seller, { cascade: true })

    bids: BidOffer[]



    @OneToMany(() => PostBidOffer, (postBidOffer) => postBidOffer.bidder, { cascade: true })

    postBidOffers: PostBidOffer[];





    @OneToMany(() => Inquiry, (inquiry) => inquiry.buyer, { cascade: true })

    inquiryes: Inquiry[]



    @OneToMany(() => SampleRequest, (sampleRequest) => sampleRequest.buyer, { cascade: true })

    sampleRequestBuyer: SampleRequest[]



    @OneToMany(() => CompanyProfile, (companyProfile) => companyProfile.createdBy, { cascade: true })

    companyProfiles: CompanyProfile[]





    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })

    createdAt: Date;



    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })

    updatedAt: Date;

}
