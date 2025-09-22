import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from 'src/category/category.module';
import { UserModule } from 'src/user/user.module';
import { WholesaleModule } from 'src/wholesale/wholesale.module';
import { Wholesale } from 'src/wholesale/wholesale.entity';
import { B2bModule } from 'src/b2b/b2b.module';
import { B2b } from 'src/b2b/b2b.entity';
import { Retail } from 'src/retail/retail.entity';
import { RetailModule } from 'src/retail/retail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Wholesale, B2b, Retail]),
    CategoryModule,
    UserModule,
    forwardRef(() => WholesaleModule),
    forwardRef(() => B2bModule),
    forwardRef(() => RetailModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule { }
