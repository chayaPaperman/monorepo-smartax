import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from './client.model';
import { User } from '../Models/user.model';

@Schema()
export class Documents extends Document {
    @Prop()
    name: string;

    @Prop()
    fileId: string;

    @Prop()
    viewLink: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
    client: Client;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userUpload: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userCare: User;
    @Prop()
    status:string;

}

export const DocumentsModel = SchemaFactory.createForClass(Documents);
