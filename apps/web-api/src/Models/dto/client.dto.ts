
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'



export class CreateClientDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('IL', { message: 'ContactInfo must be a valid Israeli phone number' })
    @Length(10, 10, { message: 'ContactInfo must be exactly 10 digits' })
    contactInfo: string;


    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    businessName: string;


    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    source: string;


    @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  status: string;


    @ApiProperty({ type: Date })
    @IsNotEmpty()
    @IsDateString()
    createdDate: Date;
}

export class UpdateClientDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    name?: string;
    @ApiProperty()

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    contactInfo?: string;


    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    businessName?: string;


    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    source?: string;


    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    status?: string;


    @ApiProperty({ type: Date, required: true })
    @IsOptional()
    @IsDateString()
    createdDate?: Date;
}

