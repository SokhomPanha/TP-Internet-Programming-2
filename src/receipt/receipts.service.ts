import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from '../database/entities/receipts.entity';
import { NotificationsService } from 'src/notifications/notifications.service';


@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    private notifications: NotificationsService
  ) {}

  async findAll() {
    return this.receiptRepo.find({ order: { issuedAt: 'DESC' } });
  }

  async findOne(receiptId: string) {
    const receipt = await this.receiptRepo.findOne({ where: { receiptId } });
    if (!receipt) {
      throw new NotFoundException('Receipt not found');
      return receipt;
    }
  }

  async create(dto: CreateReceiptDto) {
    const receipt = this.receiptRepo.create({
      name: dto.name,
      price: dto.price,
      issuedAt: new Date(dto.issuedAt),
    });

  
    const saved = await this.receiptRepo.save(receipt);

    this.notifications.notify('receipt_created', {
      receiptId: saved.receiptId,
      price: saved.price,
    })
    
    return saved;
  }

  async update(id: string, dto: UpdateReceiptDto){
    const receipt = await this.receiptRepo.findOne({ where: { receiptId: id } });
    if (!receipt){
        throw new NotFoundException('Receipt not found');
    }

    if (dto.name !== undefined) {
        receipt.name = dto.name;
    }
    if (dto.price !== undefined) {
        receipt.price = dto.price;
    }
    if (dto.issuedAt !== undefined) {
        receipt.issuedAt = new Date(dto.issuedAt);
    }

    return this.receiptRepo.save(receipt);
  }

  async remove(receiptId: string) {
    const receipt = await this.receiptRepo.findOne({ where: { receiptId } });
    if (!receipt){
        throw new NotFoundException('Receipt not found');
    }
    await this.receiptRepo.remove(receipt);
    return {deleted : true, receiptId}
  }


}
