import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from '../Models/user.model';
import { CreateUserDto, UpdateUserDto } from '../Models/dto/user.dto';
import { ValidationException } from '../common/exceptions/validation.exception';
import { TokenService } from './jwt.service';
import * as bcrypt from 'bcryptjs';
import { CreateTaskDto, UpdateTaskDto } from '../Models/dto/task.dto';
import { Task } from '../Models/task.model';



@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private jwtToken:TokenService
    
  ) {}
  

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {  client, taskName, description,dueDate,status,assignedTo,tags } = createTaskDto;

    // if (!client || !assignedTo) {
    //   throw new ValidationException('Missing required fields');
    // }

    const createTask = new this.taskModel({ client, taskName, description,dueDate,status,assignedTo,tags  });
    return await createTask.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById({"_id":id}).exec();
    if (!task) {
      throw new ValidationException('Task not found');
    }
    return task;
  }


  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const {  client, taskName, description,dueDate,status,assignedTo,tags } = updateTaskDto;

    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      { client, taskName, description,dueDate,status,assignedTo,tags },
      { new: true }
    ).exec();

    if (!updatedTask) {
      throw new ValidationException('Task not found');
    }
    return updatedTask;
  }

  async deleteTask(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new ValidationException('User not found');
    }
    return deletedTask;
  }
}

