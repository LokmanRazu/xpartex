import { Product } from "../product/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('b2b')
export class B2b {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json' })
    description?: { title: string, value: string }[]

    @Column("json", { nullable: true })
    size?: {productsize:string,productQuantity:string}[];

    @Column()
    moq?: number;

    @ManyToOne(() => Product, (product) => product.wholesales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "productId" })
    product: Product;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
