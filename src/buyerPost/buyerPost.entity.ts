
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('buyerPost')
export class BuyerPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    img: string;

    @Column()
    location?: string;

    @Column()
    duration: Date;


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}