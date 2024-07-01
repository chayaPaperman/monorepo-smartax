import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillingStatus } from '../Models/billingStatus.model';
import { CreateBillingStatusDto, UpdateBillingStatusDto } from '../Models/dto/biliingStatus.dto';

@Injectable()
export class BillingStatusService {
  constructor(@InjectModel('BillingStatus') private readonly BillingStatusModel: Model<BillingStatus>) {}

  async createBillingStatus(createBillingStatusDto: CreateBillingStatusDto): Promise<BillingStatus> {
    const createdBillingStatus = new this.BillingStatusModel(createBillingStatusDto);
    return createdBillingStatus.save();
  }

  async updateBillingStatus(id: string, updateBillingStatusDto: UpdateBillingStatusDto): Promise<BillingStatus> {
    const updatedBillingStatus = await this.BillingStatusModel.findByIdAndUpdate(
      id,
      updateBillingStatusDto,
      { new: true }
    ).exec();

    if (!updatedBillingStatus) {
      throw new NotFoundException('BillingStatus not found');
    }

    return updatedBillingStatus;
  }

  async getAllBillingStatuses(): Promise<BillingStatus[]> {
    return this.BillingStatusModel.find().exec();
  }
}