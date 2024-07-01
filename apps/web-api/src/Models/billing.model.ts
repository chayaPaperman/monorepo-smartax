import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from './client.model';
import { BillingStatus } from './billingStatus.model';
import { User } from '../Models/user.model';
//add Malka comment git merge
@Schema()
export class Billing extends Document {

    @Prop({ type: Client })
    client: Client;

    @Prop()
    amount: string;

    @Prop({ type: BillingStatus })
    status: BillingStatus;

    @Prop()
    dueDate: Date;

    @Prop()
    paidDate: Date;

    @Prop({ type: User })
    assignedTo: User;
}

export const BillingModel = SchemaFactory.createForClass(Billing);

