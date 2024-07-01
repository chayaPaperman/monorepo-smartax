import { Body, Controller, Delete, Get, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto, UpdateRoleDto } from "../../Models/dto/role.dto";
import { Role } from "../../Models/role.modle";
import { HttpExceptionFilter } from "../../common/filters/http-exception.filter";
import { RoleService } from "../../services/role.service";


@ApiTags('role')
@Controller('role')
@UseFilters(HttpExceptionFilter) 
export class RoleController {

    constructor(private readonly roleService: RoleService) { }

    @Put()
    async createRole(@Body(new ValidationPipe()) createRoleDto: CreateRoleDto): Promise<Role> {
        return await this.roleService.createRole(createRoleDto);
    }

    @Get()
    async getAllRolies(): Promise<Role[]> {
        return await this.roleService.getALLRolies();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchRole')
    async searchRole(@Body(new ValidationPipe())  body:{"id":string}): Promise<Role> {
        return await this.roleService.searchRole(body.id);
    }
    @Post()
    async updateRole(@Body(new ValidationPipe()) updateRoleDto: UpdateRoleDto): Promise<Role> {
        return await this.roleService.updateRole(updateRoleDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteRole(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.roleService.deleteRole(id.id);
    }
}
