import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateTagDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    text: string;


    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    color: string;
}

export class UpdateTagDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    text?: string;
    @ApiProperty()

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    color?: string;
}

