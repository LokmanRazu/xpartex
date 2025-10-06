import { Buyerpost } from "../buyerPost/buyerPost.entity";
import { Product } from "../product/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @OneToMany(() => Product, (product) => product.category, {
        cascade: true,
    })
    product: Product[];

        @OneToMany(() => Buyerpost, (buyerPost) => buyerPost.category, {
        cascade: true,
    })
    buyerPost: Buyerpost[];
}