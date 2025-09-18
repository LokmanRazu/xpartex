import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/user/dto/user.response-dto';
import { CartItemResponseDto } from 'src/cartItem/dto/cartItem.response-dto';

export class CartResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: () => UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  // @ApiProperty({ type: () => [CartItemResponseDto] })
  // @Expose()
  // @Type(() => CartItemResponseDto)
  // cartItems: CartItemResponseDto[];
}