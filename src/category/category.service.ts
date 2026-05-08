import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,

    ){}

    findAll(): Promise<Category[]>{
        return this.categoryRepo.find();
    }
    async findOne(id: number): Promise<Category>{
        const cat = await this.categoryRepo.findOneBy({id});
        if(!cat) throw new NotFoundException(`Category #${id} not found`);
        return cat;
    }

    create(data: {name: string}): Promise<Category>{
        const category = this.categoryRepo.create(data);
        return this.categoryRepo.save(category);
    }
}
