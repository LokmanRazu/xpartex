
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum userRole{
    ADMIN = 'admin',
    SELLER = 'seller',
    BUYER = 'buyer'
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    firstName: string;

        @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

   @Column({
    type:'enum',
    enum:userRole
   })
   role:userRole

   @Column()
   address:string

   @Column()
   registrationdate:Date

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}