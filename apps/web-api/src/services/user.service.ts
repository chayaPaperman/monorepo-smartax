import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../Models/dto/user.dto';
import { ValidationException } from '../common/exceptions/validation.exception';
import { TokenService } from './jwt.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../Models/user.model';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtToken:TokenService
    
  ) {}
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
    
  }



  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, email, passwordHash, role } = createUserDto;

    if (!userName || !email || !passwordHash || !role) {
      throw new ValidationException('Missing required fields');
    }

    const createdUser = new this.userModel({ userName, email, passwordHash, role });
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new ValidationException('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { userName, email, passwordHash, role } = updateUserDto;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { userName, email, passwordHash, role },
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new ValidationException('User not found');
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new ValidationException('User not found');
    }
    return deletedUser;
  }
}

