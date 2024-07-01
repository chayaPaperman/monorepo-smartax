import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from '../Models/user.model';
import { CreateUserDto, UpdateUserDto } from '../Models/dto/user.dto';
import { TokenService } from './jwt.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class hashPasswordService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
      ) {}
    async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        if (plainTextPassword && hashedPassword) {
          return bcrypt.compare(plainTextPassword, hashedPassword);
        } else {
          throw new Error('Illegal arguments: undefined, string');
        }
      }
      async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
      }
}
