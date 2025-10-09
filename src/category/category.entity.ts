import { Buyerpost } from "../buyerPost/buyerPost.entity";
import { Product } from "../product/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from "../subCategory/subCategory.entity";

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

    @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
        cascade: true,
    })
    subCategories: SubCategory[];
}