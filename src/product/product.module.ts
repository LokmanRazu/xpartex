import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { WholesaleModule } from '../wholesale/wholesale.module';
import { Wholesale } from '../wholesale/wholesale.entity';
import { B2bModule } from '../b2b/b2b.module';
import { B2b } from '../b2b/b2b.entity';
import { Retail } from '../retail/retail.entity';
import { RetailModule } from '../retail/retail.module';
import { CompanyProfileModule } from '../companyProfile/companyProfile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Wholesale, B2b, Retail]),
    CategoryModule,
    CompanyProfileModule,
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
