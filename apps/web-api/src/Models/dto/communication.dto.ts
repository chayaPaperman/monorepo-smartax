import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsString, IsOptional, MaxLength } from 'class-validator';
import { Types } from 'mongoose';


export class CreateCommunicationDto {
    @ApiProperty({ type: String, example: 'client_id_example' })
    @IsNotEmpty()
    client: Types.ObjectId;

    @ApiProperty({ type: Date, example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @ApiProperty({ type: String, example: 'Meeting' })
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty({ type: String, example: 'Discussion summary' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    summary: string;

    @ApiProperty({ type: String, example: 'user_id_example' })
    @IsNotEmpty()
    assignedTo: Types.ObjectId;
}

export class UpdateCommunicationDto {
    @ApiProperty({ type: String, example: 'client_id_example', required: false })
    @IsOptional()
    client?: Types.ObjectId;

    @ApiProperty({ type: Date, example: new Date(), required: true })
    @IsOptional()
    @IsDateString()
    date?: Date;

    @ApiProperty({ type: String, example: 'Meeting', required: true })
    @IsOptional()
    @IsString()
    type?: string;

    @ApiProperty({ type: String, example: 'Discussion summary', required: true })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    summary?: string;

    @ApiProperty({ type: String, example: 'user_id_example', required: true })
    @IsOptional()
    assignedTo?: Types.ObjectId;
    
    @ApiProperty({ type: String, example: '123456789', required: true })
    @IsOptional()
    id?: string;
}

