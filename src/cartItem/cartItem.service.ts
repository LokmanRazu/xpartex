
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cartItem.entity';
import { plainToInstance } from 'class-transformer';
import { CartItemResponseDto } from './dto/cartItem.response-dto';
import { CreateCartItemDto } from './dto/cartItem.request-dto';
import { UpdateCartItemDto } from './dto/cartItem.update-dto';
import { Product } from '../product/product.entity';
import { ProductService } from '../product/product.service';
import { Cart } from '../cart/cart.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  async findAll(): Promise<CartItemResponseDto[]> {
    try {
      const cartItems = await this.cartItemRepository.find({ relations: ['product', 'cart'] });
      return plainToInstance(CartItemResponseDto, cartItems, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch cart items');
    }
  }

  async findOne(id: string): Promise<CartItemResponseDto> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id },
        relations: ['product', 'cart'],
      });
      if (!cartItem) throw new NotFoundException('Cart item not found');

      return plainToInstance(CartItemResponseDto, cartItem, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch cart item');
    }
  }

  async create(dto: CreateCartItemDto): Promise<CartItemResponseDto> {
    try {
      const { productId, cartId, quantity } = dto;

      const product = await this.productService.findOne(productId);
      if (!product) throw new NotFoundException('Product not found for given productId');

      const cart = await this.cartService.findOne(cartId);
      if (!cart) throw new NotFoundException('Cart not found for given cartId');

      const cartItem = this.cartItemRepository.create({
        quantity,
        product: { id: dto.productId } as Product,
        cart: { id: dto.cartId } as Cart,
      });

      const savedCartItem = await this.cartItemRepository.save(cartItem);

      return plainToInstance(CartItemResponseDto, savedCartItem, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to create cart item');
    }
  }

  async update(id: string, dto: UpdateCartItemDto): Promise<CartItemResponseDto> {
    try {
      const cartItem = await this.cartItemRepository.findOne({ where: { id }, relations: ['product', 'cart'] });
      if (!cartItem) throw new NotFoundException('Cart item not found');

      if (dto.productId) {
        const product = await this.productService.findOne(dto.productId);
        if (!product) throw new NotFoundException('Product not found for given productId');
        cartItem.product = { id: dto.productId } as Product;
      }

      if (dto.cartId) {
        const cart = await this.cartService.findOne(dto.cartId);
        if (!cart) throw new NotFoundException('Cart not found for given cartId');
        cartItem.cart = { id: dto.cartId } as Cart;
      }

      Object.assign(cartItem, dto);
      const updatedCartItem = await this.cartItemRepository.save(cartItem);

      return plainToInstance(CartItemResponseDto, updatedCartItem, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update cart item');
    }
  }

  async delete(id: string): Promise<CartItemResponseDto> {
    try {
      const cartItem = await this.cartItemRepository.findOne({ where: { id }, relations: ['product', 'cart'] });
      if (!cartItem) throw new NotFoundException('Cart item not found');

      await this.cartItemRepository.delete(id);

      return plainToInstance(CartItemResponseDto, cartItem, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete cart item');
    }
  }
}
