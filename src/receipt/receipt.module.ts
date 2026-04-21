import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReciptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { Receipt } from '../database/entities/receipts.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
  controllers: [ReciptsController],
  providers: [ReceiptsService],
})
export class ReceiptModule {}