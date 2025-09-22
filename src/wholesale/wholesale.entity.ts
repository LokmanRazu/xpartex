import { Product } from "src/product/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('wholesale')
export class Wholesale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json' })
    description?: {title:string,value:string}[]

    @Column()
    size?: string

    @Column()
    moq?: number

    @ManyToOne(() => Product, (product) => product.wholesales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "productId" })
    product: Product;


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}