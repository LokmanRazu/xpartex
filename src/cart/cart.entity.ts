import { User } from "../user/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "../cartItem/cartItem.entity";

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, (user) => user.cart, {onDelete:'CASCADE'})
    @JoinColumn({name:"userId"})
    user: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { onDelete:'CASCADE' })
    cartItems: CartItem[];
}