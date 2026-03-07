
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(body: Partial<User>) {
    const newUser = this.userRepo.create(body);
    return await this.userRepo.save(newUser);
  }

  async getUser(username: string) {
    const user = await this.userRepo.findOne({ 
      where: { username },
      relations: ['tasks'] 
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async updateUser(username: string, body: Partial<User>) {
    await this.userRepo.update({ username }, body);
    return this.getUser(username);
  }

  async deleteUser(username: string) {
    const result = await this.userRepo.delete({ username });
    
    if (result.affected === 0) {
      throw new NotFoundException(`User ${username} not found`);
    }
    return { message: 'success' };
  }
}



