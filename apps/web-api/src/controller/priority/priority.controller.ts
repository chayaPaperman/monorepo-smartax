
import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'; 
import { ClientService } from '../../services/client.service';
import {  ApiOperation ,ApiBody, ApiProperty, ApiTags} from '@nestjs/swagger';
import { StatusService } from '../../services/status.service';
import { CreateStatusDto, UpdateStatusDto } from '../../Models/dto/status.dto';
import { Status } from '../../Models/status.model';


@ApiTags('Status')
@Controller('Status')
@UseFilters(HttpExceptionFilter) 
export class StatusController {

    constructor(private readonly StatusService: StatusService) { }

    @Post()
    async createStatus(@Body(new ValidationPipe()) createClientDto: CreateStatusDto): Promise<Status> {
        return await this.StatusService.createStatus(createClientDto);
    }

    @Get()
    async getAllStatuss(): Promise<Status[]> {
        return await this.StatusService.getAllStatuss();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchStatus')
    async searchStatus(@Body(new ValidationPipe())  body:{"id":string}): Promise<Status[]> {
        return await this.StatusService.searchStatus(body.id);
    }
    @Put()
    async updateStatus(@Body(new ValidationPipe()) updateStatusDto: UpdateStatusDto): Promise<Status> {
        return await this.StatusService.updateStatus(updateStatusDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteStatus(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.StatusService.deleteStatus(id.id);
    }
}
