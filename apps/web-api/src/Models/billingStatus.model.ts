import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BillingStatus extends Document {

    @Prop({ type: String })
    name: String;
}
export const BillingStatusModel = SchemaFactory.createForClass(BillingStatus);