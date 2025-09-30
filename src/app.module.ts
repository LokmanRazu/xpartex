import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';  
import { BuyerPostModule } from './buyerPost/buyerPost.module';
import { ProductModule } from './product/product.module';
import { CartModule } from "./cart/cart.module";
import { CategoryModule } from "./category/category.module";
import { B2bModule } from "./b2b/b2b.module";
import { RetailModule } from "./retail/retail.module";
import { WholesaleModule } from './wholesale/wholesale.module';
import { CartItemModule } from './cartItem/cartItem.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './orderItem/orderItem.module';
import { RfqModule } from './rfq/rfq.module';
import { BidOfferModule } from './bidOffer/bidOffer.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { SampleRequestModule } from './sampleRequest/sampleRequest.module';
import { UserProfileModule } from './userProfile/userProfile.module';
import { CompanyProfileModule } from './companyProfile/companyProfile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'xpartexdb',
      autoLoadEntities: true,  
      synchronize: true,
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', 
        port: 465,
        secure: true, 
        auth: {
          user: 'xpartexofficial@gmail.com',  
          pass: 'wbphwqgwbfzzycjn', 
        },
      },
      defaults: {
        from: '"xpartexofficial" <xpartexofficial@gmail.com>',  
      },
    }),

    UserModule,
    AuthModule,
    BuyerPostModule,
    ProductModule,
    WholesaleModule,
    RetailModule,
    B2bModule,
    CategoryModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderItemModule,
    RfqModule,
    BidOfferModule,
    InquiryModule,
    SampleRequestModule,
    UserProfileModule, 
    CompanyProfileModule

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
