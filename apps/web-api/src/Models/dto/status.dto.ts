import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateStatusDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    color: string;
}

export class UpdateStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    name?: string;
    @ApiProperty()

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    color?: string;
}

