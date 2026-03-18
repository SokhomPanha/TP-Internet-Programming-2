import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from '../database/entities/receipts.entity';


@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
  ) {}

  async findAll() {
    return this.receiptRepo.find({ order: { isUsedAt: 'DESC' } });
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
      isUsedAt: new Date(dto.isUsedAt),
    });
    return this.receiptRepo.save(receipt);
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
    if (dto.isUsedAt !== undefined) {
        receipt.isUsedAt = new Date(dto.isUsedAt);
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
