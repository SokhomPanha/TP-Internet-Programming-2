import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ){}

    findAll(): Promise<Product[]>{
        return this.productRepo.find();
    }

    async findOne(id: number): Promise<Product>{
        const product = await this.productRepo.findOneBy({ id });
        if (!product) throw new NotFoundException(`Product #${id} not found`);
        return product;
    }

    create(data: { name: string; price : number; categoryId: number}): Promise<Product>{
        const product = this.productRepo.create(data);
        return this.productRepo.save(product);
    }
}
