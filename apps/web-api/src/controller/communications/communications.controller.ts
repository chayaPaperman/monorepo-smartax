import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CommunicationsService } from '../../services/communication.service';
import { CreateCommunicationDto, UpdateCommunicationDto } from '../../Models/dto/communication.dto';
import { Communication } from '../../Models/communication.model';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';

@ApiTags('communications')
@Controller('communications')
@UseFilters(HttpErrorFilter)
export class CommunicationsController {
    constructor(private readonly communicationsService: CommunicationsService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new communication' })
    @ApiBody({ type: CreateCommunicationDto })
    async create(@Body() createCommunicationDto: CreateCommunicationDto): Promise<Communication> {
        return this.communicationsService.createCommunication(createCommunicationDto);
    }

    @Post('update')
    @ApiOperation({ summary: 'Update a communication by ID' })
    @ApiBody({ type: UpdateCommunicationDto })
    async update(@Body('id') id: string, @Body() updateCommunicationDto: UpdateCommunicationDto): Promise<Communication> {
        return this.communicationsService.updateCommunication(id, updateCommunicationDto);
    }

    @Post('delete')
    @ApiOperation({ summary: 'Delete a communication by ID' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: '667211d6c'
                }
            }
        }
    })
    async delete(@Body() body: { id: string }): Promise<Communication> {
        return this.communicationsService.deleteCommunication(body.id);
    }

    @Post('all')
    @ApiOperation({ summary: 'Get all communications' })
    async getAllCommunications(): Promise<Communication[]> {
        return this.communicationsService.getAllCommunications();
    }

    @Post('by-client')
    @ApiOperation({ summary: 'Get communications by Client ID' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                clientId: {
                    type: 'string',
                    example: '123456789'
                }
            }
        }
    })
    async getCommunicationsByClientId(@Body() body: { clientId: string }): Promise<Communication[]> {
        return this.communicationsService.getCommunicationsByClientId(body.clientId);
    }
}
