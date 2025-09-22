import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { plainToInstance } from 'class-transformer';
import { CartResponseDto } from './dto/cart.response-dto';
import { CreateCartDto } from './dto/cart.request-dto';
import { UpdateCartDto } from './dto/cart.update-dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<CartResponseDto[]> {
    try {
      const carts = await this.cartRepository.find({ relations: ['user','cartItems','cartItems.product'] });
      return plainToInstance(CartResponseDto, carts, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch carts');
    }
  }

  async findOne(id: string): Promise<CartResponseDto> {
    try {
      const cart = await this.cartRepository.findOne({ where: { id }, relations: ['user','cartItems','cartItems.product'] });
      if (!cart) throw new NotFoundException('Cart not found');
      return plainToInstance(CartResponseDto, cart, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch cart');
    }
  }

  async create(dto: CreateCartDto): Promise<CartResponseDto> {
    try {
      const user = await this.userService.findOne((dto.userId));
      if (!user) throw new NotFoundException('User not found');

      const cart = this.cartRepository.create({ user: { id: dto.userId } as User });
      const savedCart = await this.cartRepository.save(cart);
      return plainToInstance(CartResponseDto, savedCart, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch(error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
      throw new InternalServerErrorException('Failed to create cart');
    }
  }

  async update(id: string, dto: UpdateCartDto): Promise<CartResponseDto> {
    try {
      const cart = await this.cartRepository.findOne({ where: { id }, relations: ['user'] });
      if (!cart) throw new NotFoundException('Cart not found');

      if (dto.userId) {
        const user = await this.userService.findOne(String(dto.userId));
        if (!user) throw new NotFoundException('User not found');
        cart.user = { id: dto.userId } as User;
      }

      const updatedCart = await this.cartRepository.save(cart);
      return plainToInstance(CartResponseDto, updatedCart, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update cart');
    }
  }

  async delete(id: string): Promise<CartResponseDto> {
    try {
      const cart = await this.cartRepository.findOne({ where: { id }, relations: ['user'] });
      if (!cart) throw new NotFoundException('Cart not found');

      await this.cartRepository.delete(id);
      return plainToInstance(CartResponseDto, cart, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete cart');
    }
  }
}
