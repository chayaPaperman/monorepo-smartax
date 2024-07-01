import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from './client.model';
import { User } from '../Models/user.model';
import { Tag } from './tag.model';
import { Priority } from './priority.model';
import { Status } from './status.model';

@Schema()
export class Task extends Document {
    @Prop()//{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
    client: Client;

    @Prop()
    taskName: string;

    @Prop()
    description: string;
    @Prop()
    dueDate: Date;

    @Prop()
    startDate: Date;

    @Prop()
    status: Status;

    @Prop()//{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    assignedTo: User;

    @Prop()//{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
    tags:Tag[];

    @Prop()
    priority: Priority;

    @Prop()
    images: string[];
}

export const TaskModel = SchemaFactory.createForClass(Task);
