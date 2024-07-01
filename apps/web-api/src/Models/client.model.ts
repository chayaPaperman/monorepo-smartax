import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Client extends Document {
    @Prop()
    name: string;

    @Prop()
    contactInfo: string;

    @Prop()
    businessName: string;
    
    @Prop()
    source: string;

    @Prop()
    status: string;

    @Prop()
    createdDate: Date;
}

export const ClientModel = SchemaFactory.createForClass(Client);
