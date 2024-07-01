import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMeetDto, UpdateMeetDto } from "../Models/dto/meet .dto";
import { Meet } from "../Models/meet.model";
import { ValidationException } from "../common/exceptions/validation.exception";


@Injectable()
export class MeetService {

    constructor(@InjectModel('Meet') private readonly MeetModel: Model<Meet>) { }

    async createMeet(createMeetDto: CreateMeetDto): Promise<Meet> {
        const { link, date, beginningTime, endTime, assignedTo, clientDepartments } = createMeetDto;

        if (!link || !date || !beginningTime || !endTime || !assignedTo || !clientDepartments) {
            throw new ValidationException('Missing required fields');
        }
        const createMeet = new this.MeetModel({link, date, beginningTime, endTime, assignedTo, clientDepartments });
        return await createMeet.save();
    }

        async getALLMeetings(): Promise<Meet[]> {
            return await this.MeetModel.find().exec();
        }
        async updateMeet(updateMeetDto: UpdateMeetDto): Promise<Meet> {
            const {id, ...updateData } = updateMeetDto;
            const updatedMeet = await this.MeetModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedMeet) {
                throw new NotFoundException(`Meet with ID ${id} not found`);
            }
            return updatedMeet;
        }

        async deleteMeet(id: string): Promise<boolean> {
            const deletedMeet = await this.MeetModel.findByIdAndDelete(id);
            if (!deletedMeet) {
                throw new NotFoundException(`Meet with ID ${id} not found`);
            }
            return !!deletedMeet;
        }
        async searchMeet(id:string): Promise<Meet> {
            const meetings= await this.MeetModel.find({"_id":id}).exec();
            if (!meetings || meetings.length === 0) {
                throw new NotFoundException('Meet not found');
              }
              return meetings[0];
        }
}
