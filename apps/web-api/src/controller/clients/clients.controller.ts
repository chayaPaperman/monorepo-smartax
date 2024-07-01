
import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'; 

import {  ApiOperation ,ApiBody, ApiProperty, ApiTags} from '@nestjs/swagger';
import { Client } from '../../Models/client.model';
import { CreateClientDto, UpdateClientDto } from '../../Models/dto/client.dto';
import { ClientService } from '../../services/client.service';

@ApiTags('clients')
@Controller('clients')
@UseFilters(HttpExceptionFilter) 
export class ClientController {

    constructor(private readonly clientService: ClientService) { }

    @Post()
    async createClient(@Body(new ValidationPipe()) createClientDto: CreateClientDto): Promise<Client> {
        return await this.clientService.createClient(createClientDto);
    }

    @Get()
    async getAllClients(): Promise<Client[]> {
        return await this.clientService.getALLClients();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchClient')
    async searchClient(@Body(new ValidationPipe())  body:{"id":string}): Promise<Client> {
        return await this.clientService.searchClient(body.id);
    }
    @Put()
    async updateClient(@Body(new ValidationPipe()) updateClientDto: UpdateClientDto): Promise<Client> {
        return await this.clientService.updateClient(updateClientDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteClient(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.clientService.deleteClient(id.id);
    }
}
