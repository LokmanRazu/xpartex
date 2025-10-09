import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';

@Entity('sub_category')
export class SubCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => Category, (category) => category.subCategories)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @OneToMany(() => Product, (product) => product.subCategory)
    product: Product[];
}
