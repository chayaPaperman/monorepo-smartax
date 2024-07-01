import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { Client } from "../client.model";
import { BillingStatus } from '../billingStatus.model';
import { User } from '../../Models/user.model';
export class UpdateBillingDto {
    @ApiProperty({ type: Client, example: { name: 'John Doe', contactInfo: 'john.doe@example.com', businessName: 'Doe Corporation', source: 'Referral', status: 'Active', createdDate: new Date() }, required: false })
    @IsOptional()
    client?: Client;

    @ApiProperty({ type: String, example: '5000', required: false })
    @IsOptional()
    @IsString()
    amount?: string;

    @ApiProperty({ type: BillingStatus, example: { name: 'TODO' }, required: false })
    @IsOptional()
    @IsString()
    status?: BillingStatus;

    @ApiProperty({ type: Date, example: new Date(), required: false })
    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @ApiProperty({ type: Date, example: new Date(), required: false })
    @IsOptional()
    @IsDateString()
    paidDate?: Date;

    @ApiProperty({ type: User, example: { userName: 'John Doe', email: 'john.doe@example.com', passwordHash: '000000000', role: { name: 'admin', level: 3 }, required: false } })
    @IsOptional()
    assignedTo?: User;

    @ApiProperty({ type: String, example: '123456789', required: false })
    @IsOptional()
    @IsString()
    id?: string;
}
export class CreateBillingDto {
    @ApiProperty({ type: Client, example: { name: 'John Doe', contactInfo: 'john.doe@example.com', businessName: 'Doe Corporation', source: 'Referral', status: 'Active', createdDate: new Date() } })
    @IsNotEmpty()
    client: Client;

    @ApiProperty({ type: String, example: '5000' })
    @IsNotEmpty()
    @IsString()
    amount: string;

    @ApiProperty({ type: BillingStatus, example: { name: 'TODO' } })
    @IsNotEmpty()
    status: BillingStatus;

    @ApiProperty({ type: Date, example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @ApiProperty({ type: Date, example: new Date() })
    @IsDateString()
    paidDate: Date;

    @ApiProperty({ type: User, example: { userName: 'John Doe', email: 'john.doe@example.com', passwordHash: '000000000', role: { name: 'admin', level: 3 } } })
    @IsNotEmpty()
    assignedTo: User;
}
