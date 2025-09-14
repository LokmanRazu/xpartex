import { Wholesale } from "src/wholesale/wholesale.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    img: string

    @Column()
    sellerId: string

    @Column()
    category: string;

    @Column()
    price: string

    @Column()
    stockQuantity: number

    @Column()
    description: string

    @OneToMany(() => Wholesale, (wholesale) => wholesale.product, {
        cascade: true,
    })
    wholesales: Wholesale[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;



}