
import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'; 
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateTagDto, UpdateTagDto } from '../../Models/dto/tag.dto';
import { Tag } from '../../Models/tag.model';
import { TagService } from '../../services/tag.service';


@ApiTags('tags')
@Controller('tags')
@UseFilters(HttpExceptionFilter) 
export class TagController {

    constructor(private readonly tagService: TagService) { }

    @Post()
    async createTag(@Body(new ValidationPipe()) createClientDto: CreateTagDto): Promise<Tag> {
        return await this.tagService.createTag(createClientDto);
    }

    @Get()
    async getAllTags(): Promise<Tag[]> {
        return await this.tagService.getAllTags();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchTag')
    async searchTag(@Body(new ValidationPipe())  body:{"id":string}): Promise<Tag[]> {
        return await this.tagService.searchTag(body.id);
    }
    @Put()
    async updateTag(@Body(new ValidationPipe()) updateTagDto: UpdateTagDto): Promise<Tag> {
        return await this.tagService.updateTag(updateTagDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteTag(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.tagService.deleteTag(id.id);
    }
}
