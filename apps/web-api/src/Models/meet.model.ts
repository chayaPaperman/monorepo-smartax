import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../Models/user.model';

@Schema()
export class Meet extends Document {
    @Prop()
    link: string;

    @Prop()
    date:Date;

    @Prop()
    beginningTime:Date;

    @Prop()
    endTime:Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    assignedTo: User;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }])
    clientDepartments: mongoose.Types.ObjectId[];
}

export const MeetModel = SchemaFactory.createForClass(Meet);