
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto, UpdateTagDto } from '../Models/dto/tag.dto';
import { ValidationException } from '../common/exceptions/validation.exception';
import { Tag } from '../Models/tag.model';

@Injectable()
export class TagService {

    constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

    async createTag(createTagDto: CreateTagDto): Promise<Tag> {
        const { color,text } = createTagDto;

        if (!color || !text ) {
          throw new ValidationException('Missing required fields');
        }
        const createdTag = new this.tagModel({ color,text });
        return await createdTag.save();
    }

    async getAllTags(): Promise<Tag[]> {
        return await this.tagModel.find().exec();
    }
    async searchTag(id:string): Promise<Tag[]> {
        const tags= await this.tagModel.find({"_id":id}).exec();
        if (!tags || tags.length === 0) {
            throw new NotFoundException('Client not found');
          }
          return tags;
    }
    async updateTag(updateTagDto: UpdateTagDto): Promise<Tag> {
        const {id, ...updateData } = updateTagDto;
        const updatedTag = await this.tagModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTag) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
        return updatedTag;
    }

    async deleteTag(id: string): Promise<boolean> {
        const deletedTag = await this.tagModel.findByIdAndDelete(id);
        if (!deletedTag) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
        return !!deletedTag;
    }
}
