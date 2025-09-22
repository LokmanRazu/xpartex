import { Product } from "src/product/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('retail')
export class Retail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    size?: number


    @ManyToOne(() => Product, (product) => product.retails, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "productId" })
    product: Product;


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}