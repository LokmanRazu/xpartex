import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wholesale } from './wholesale.entity';
import { WholesaleController } from './wholesale.controller';
import { WholesaleService } from './wholesale.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wholesale]),
    forwardRef(() => ProductModule), 
  ],
  controllers: [WholesaleController],
  providers: [WholesaleService],
  exports: [WholesaleService],
})
export class WholesaleModule {}
