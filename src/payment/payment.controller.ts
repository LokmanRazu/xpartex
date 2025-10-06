import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestDto } from './dto/payment.request-dto';
import { UpdatePaymentDto } from './dto/payment.update-dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentResponseDto } from './dto/payment.response-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiOkResponse({ type: PaymentResponseDto })
  create(@Body() paymentRequestDto: PaymentRequestDto) {
    return this.paymentService.create(paymentRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiOkResponse({ type: [PaymentResponseDto] })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment by id' })
  @ApiOkResponse({ type: PaymentResponseDto })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiOkResponse({ type: PaymentResponseDto })
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiOkResponse({ type: PaymentResponseDto })
  delete(@Param('id') id: string) {
    return this.paymentService.delete(id);
  }
}
