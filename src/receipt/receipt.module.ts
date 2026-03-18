import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReciptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { Receipt } from '../database/entities/receipts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  controllers: [ReciptsController],
  providers: [ReceiptsService],
})
export class ReceiptModule {}