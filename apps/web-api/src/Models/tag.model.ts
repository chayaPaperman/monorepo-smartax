import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tag extends Document {
    @Prop()
    text: string;

    @Prop()
    color: string;
}

export const TagModel = SchemaFactory.createForClass(Tag);
