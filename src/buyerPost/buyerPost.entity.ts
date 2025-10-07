
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { PostBidOffer } from '../postBidOffer/postBidOffer.entity';

export enum ProductStatus {
    OPEN = 'open',
    CLOSED = 'closed',
}


@Entity('buyerpost')
export class Buyerpost {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.buyerpost, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Category, (category) => category.buyerPost, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    target_price: number;

    @Column({ type: 'int', nullable: true })
    quantity: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    unit: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    location: string;

    @Column({ type: 'date', nullable: true })
    deadline: Date;

    @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.OPEN })
    status: ProductStatus;

    @OneToMany(() => PostBidOffer, (postBidOffer) => postBidOffer.buyerPost, { cascade: true })
    postBidOffers: PostBidOffer[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
