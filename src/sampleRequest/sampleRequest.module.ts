import { Module } from '@nestjs/common';
import { SampleRequestController } from './sampleRequest.controller';
import { SampleRequestService } from './sampleRequest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleRequest } from './sampleRequest.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([SampleRequest]), ProductModule],
  controllers: [SampleRequestController],
  providers: [SampleRequestService],
})
export class SampleRequestModule {}
