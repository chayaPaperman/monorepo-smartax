import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsNotEmpty } from 'class-validator';
export class UpdateBillingStatusDto {
    @ApiProperty({ type: () => String, example: 'TODO' })
    @IsString()
    @IsOptional()
    name: String;
    @ApiProperty({ type: String, example: '123456789', required: false })
    @IsOptional()
    @IsString()
    id?: string;
}
export class CreateBillingStatusDto {
    @ApiProperty({ type: () => String, example: 'TODO' })
    @IsString()
    @IsNotEmpty()
    name: String;
}
