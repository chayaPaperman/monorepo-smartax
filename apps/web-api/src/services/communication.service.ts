import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommunicationDto, UpdateCommunicationDto } from '../Models/dto/communication.dto';
import { Communication } from '../Models/communication.model';

@Injectable()
export class CommunicationsService {
  constructor(@InjectModel('Communication') private readonly communicationModel: Model<Communication>) {}

  async createCommunication(createCommunicationDto: CreateCommunicationDto): Promise<Communication> {
    const createdCommunication = new this.communicationModel(createCommunicationDto);
    return createdCommunication.save();
  }

  async updateCommunication(id: string, updateCommunicationDto: UpdateCommunicationDto): Promise<Communication> {
    const updatedCommunication = await this.communicationModel.findByIdAndUpdate(
      id,
      updateCommunicationDto,
      { new: true }
    ).exec();

    if (!updatedCommunication) {
      throw new NotFoundException('Communication not found');
    }

    return updatedCommunication;
  }

  async deleteCommunication(id: string): Promise<Communication> {
    const deletedCommunication = await this.communicationModel.findByIdAndDelete(id).exec();

    if (!deletedCommunication) {
      throw new NotFoundException('Communication not found');
    }

    return deletedCommunication;
  }

  async getAllCommunications(): Promise<Communication[]> {
    return this.communicationModel.find().exec();
  }

  async getCommunicationsByClientId(clientId: string): Promise<Communication[]> {
    console.log('Searching for communications with client ID:', clientId);
    const communications = await this.communicationModel.find({ 'client._id': clientId }).exec();
    console.log('Communications found:', communications);
    return communications;
  }
  
}
