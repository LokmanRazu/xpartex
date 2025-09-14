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
import { WholesaleModule } from './wholesale/wholesale.module';

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
      synchronize: false,
      logging: true,
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
    WholesaleModule
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
