
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStatusDto, UpdateStatusDto } from '../Models/dto/status.dto';
import { Status } from '../Models/status.model';
import { ValidationException } from '../common/exceptions/validation.exception';


@Injectable()
export class StatusService {

    constructor(@InjectModel('Status') private readonly StatusModel: Model<Status>) {}

    async createStatus(createStatusDto: CreateStatusDto): Promise<Status> {
        const { color,name } = createStatusDto;

        if (!color || !name ) {
          throw new ValidationException('Missing required fields');
        }
        const createdStatus = new this.StatusModel({ color,name });
        return await createdStatus.save();
    }

    async getAllStatuss(): Promise<Status[]> {
        return await this.StatusModel.find().exec();
    }
    async searchStatus(id:string): Promise<Status[]> {
        const Status= await this.StatusModel.find({"_id":id}).exec();
        if (!Status || Status.length === 0) {
            throw new NotFoundException('Client not found');
          }
          return Status;
    }
    async updateStatus(updateStatusDto: UpdateStatusDto): Promise<Status> {
        const {id, ...updateData } = updateStatusDto;
        const updatedStatus = await this.StatusModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedStatus) {
            throw new NotFoundException(`Status with ID ${id} not found`);
        }
        return updatedStatus;
    }

    async deleteStatus(id: string): Promise<boolean> {
        const deletedStatus = await this.StatusModel.findByIdAndDelete(id);
        if (!deletedStatus) {
            throw new NotFoundException(`Status with ID ${id} not found`);
        }
        return !!deletedStatus;
    }
}
