import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Status extends Document {
    @Prop()
    name: string;

    @Prop()
    color: string;
}

export const StatusModel = SchemaFactory.createForClass(Status);
