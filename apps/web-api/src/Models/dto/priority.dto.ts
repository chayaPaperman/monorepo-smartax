import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreatePriorityDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    color: string;
}

export class UpdatePriorityDto {
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

