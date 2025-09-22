import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('rfq')
export class Rfq {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 50 })
    title: string;

    @Column({ type: "int" })
    quantity: number;

    @Column({ type: "varchar", length: 50 })
    unit: string;

    @Column({ type: "date" })
    date: Date;

    @Column({ type: "varchar", length: 255, nullable: true })
    file: string;

    @Column({ type: "varchar", length: 100 })
    region: string;

    @ManyToOne(() => User, (user) => user.rfq, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "buyerId" })
    buyer: User;

    @ManyToOne(() => Product, (product) => product.orderitem, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "productId" })
    product: Product;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
