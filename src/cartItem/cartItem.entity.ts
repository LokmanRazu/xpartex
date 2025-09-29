
import { Cart } from "../cart/cart.entity";
import { Product } from "../product/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart_item')
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "cartId" })
    cart: Cart;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "productId" })
    product: Product;

    @Column()
    quantity: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    addedTime: Date;
}
