
import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'; 
import { ClientService } from '../../services/client.service';
import {  ApiOperation ,ApiBody, ApiProperty, ApiTags} from '@nestjs/swagger';
import { PriorityService } from '../../services/priority.service';
import { CreatePriorityDto, UpdatePriorityDto } from '../../Models/dto/priority.dto';
import { Priority } from '../../Models/priority.model';


@ApiTags('Priority')
@Controller('Priority')
@UseFilters(HttpExceptionFilter) 
export class PriorityController {

    constructor(private readonly PriorityService: PriorityService) { }

    @Post()
    async createPriority(@Body(new ValidationPipe()) createClientDto: CreatePriorityDto): Promise<Priority> {
        return await this.PriorityService.createPriority(createClientDto);
    }

    @Get()
    async getAllPrioritys(): Promise<Priority[]> {
        return await this.PriorityService.getAllPrioritys();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchPriority')
    async searchPriority(@Body(new ValidationPipe())  body:{"id":string}): Promise<Priority[]> {
        return await this.PriorityService.searchPriority(body.id);
    }
    @Put()
    async updatePriority(@Body(new ValidationPipe()) updatePriorityDto: UpdatePriorityDto): Promise<Priority> {
        return await this.PriorityService.updatePriority(updatePriorityDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deletePriority(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.PriorityService.deletePriority(id.id);
    }
}
