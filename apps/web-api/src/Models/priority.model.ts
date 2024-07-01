import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Priority extends Document {
    @Prop()
    name: string;

    @Prop()
    color: string;
}

export const PriorityModel = SchemaFactory.createForClass(Priority);
