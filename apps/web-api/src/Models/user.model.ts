import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../Models/role.modle';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    userName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
    role: Role;
}

export const UserModel = SchemaFactory.createForClass(User);
