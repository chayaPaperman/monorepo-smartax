import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({ description: 'The role name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The role level' })
    @IsNotEmpty()
    level: number;

}
export class UpdateRoleDto {

    @ApiProperty({ description: 'The role ID' })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ description: 'The role name'})
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The role level' })
    @IsNotEmpty()
    level: number;

}
