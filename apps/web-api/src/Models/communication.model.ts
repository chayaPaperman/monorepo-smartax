import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Client } from './client.model';
import { User } from '../Models/user.model';

@Schema()
export class Communication extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
    client: Client;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: String, required: true })
    type: string;

    @Prop({ type: String, required: true })
    summary: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    assignedTo: User;
}

export const communicationModel = SchemaFactory.createForClass(Communication);
