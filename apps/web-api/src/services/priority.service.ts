
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePriorityDto, UpdatePriorityDto } from '../Models/dto/priority.dto';
import { Priority } from '../Models/priority.model';
import { ValidationException } from '../common/exceptions/validation.exception';

@Injectable()
export class PriorityService {

    constructor(@InjectModel('Priority') private readonly PriorityModel: Model<Priority>) {}

    async createPriority(createPriorityDto: CreatePriorityDto): Promise<Priority> {
        const { color,name } = createPriorityDto;

        if (!color || !name ) {
          throw new ValidationException('Missing required fields');
        }
        const createdPriority = new this.PriorityModel({ color,name });
        return await createdPriority.save();
    }

    async getAllPrioritys(): Promise<Priority[]> {
        return await this.PriorityModel.find().exec();
    }
    async searchPriority(id:string): Promise<Priority[]> {
        const Priority= await this.PriorityModel.find({"_id":id}).exec();
        if (!Priority || Priority.length === 0) {
            throw new NotFoundException('Client not found');
          }
          return Priority;
    }
    async updatePriority(updatePriorityDto: UpdatePriorityDto): Promise<Priority> {
        const {id, ...updateData } = updatePriorityDto;
        const updatedPriority = await this.PriorityModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedPriority) {
            throw new NotFoundException(`Priority with ID ${id} not found`);
        }
        return updatedPriority;
    }

    async deletePriority(id: string): Promise<boolean> {
        const deletedPriority = await this.PriorityModel.findByIdAndDelete(id);
        if (!deletedPriority) {
            throw new NotFoundException(`Priority with ID ${id} not found`);
        }
        return !!deletedPriority;
    }
}
