// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TaskService {
//   getTask(id: string) {
//     console.log(id);
//     return {
//       name: 'Task 1',
//       description: 'Description of Task 1',
//       createdAt: new Date().toISOString(),
//       completedAt: null,
//       userId: 1,
//     };
//   }
//   createTask(body: any) {
//     console.log(body);
//     return {
//       name: 'Task 1',
//       description: 'Description of Task 1',
//       createdAt: new Date().toISOString(),
//       completedAt: null,
//       userId: 1,
//     };
//   }
//   updateTask(id: string, body: any) {
//     console.log(body);
//     return {
//       name: 'Task 1',
//       description: 'Description of Task 1',
//       createdAt: new Date().toISOString(),
//       completedAt: null,
//       userId: 1,
//     };
//   }
//   deleteTask(id: string) {
//     console.log(id);
//     return { message: 'success' };
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async getTask(id: number) {
    const task = await this.taskRepo.findOne({ 
      where: { id },
      relations: ['user'] // Optional: include user data if needed
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(body: Partial<Task>) {
    const newTask = this.taskRepo.create(body);
    return await this.taskRepo.save(newTask);
  }

  async updateTask(id: number, body: Partial<Task>) {
    await this.taskRepo.update(id, body);
    return this.getTask(id);
  }

  async deleteTask(id: number) {
    const result = await this.taskRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { message: 'success', deletedId: id };
  }

  // Good practice to also have a find all method
  async findAllTasks() {
  return await this.taskRepo.find();
}
}