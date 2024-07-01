import { Body, Controller, Delete, Get, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateMeetDto, UpdateMeetDto } from "../../Models/dto/meet .dto";
import { Meet } from "../../Models/meet.model";
import { HttpExceptionFilter } from "../../common/filters/http-exception.filter";
import { MeetService } from "../../services/meet.service";

@ApiTags('meet')
@Controller('meet')
@UseFilters(HttpExceptionFilter) 
export class MeetController {

    constructor(private readonly meetService: MeetService) { }

    @Put()
    @ApiOperation({ summary: 'Add meet' })
    async createRole(@Body(new ValidationPipe()) createMeetDto: CreateMeetDto): Promise<Meet> {
        return await this.meetService.createMeet(createMeetDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all meetings' })
    async getAllMeetings(): Promise<Meet[]> {
        return await this.meetService.getALLMeetings();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchMeet')
    @ApiOperation({ summary: 'Find meet by id' })
    async searchMeet(@Body(new ValidationPipe())  body:{"id":string}): Promise<Meet> {
        return await this.meetService.searchMeet(body.id);
    }
    @Post()
    @ApiOperation({ summary: 'Update meet' })
    async updateMeet(@Body(new ValidationPipe()) UpdateMeetDto: UpdateMeetDto): Promise<Meet> {
        return await this.meetService.updateMeet(UpdateMeetDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    @ApiOperation({ summary: 'Delete meet by id' })
    async deleteMeet(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.meetService.deleteMeet(id.id);
    }
}
