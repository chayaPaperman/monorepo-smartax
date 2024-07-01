import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRoleDto, UpdateRoleDto } from "../Models/dto/role.dto";
import { Role } from "../Models/role.modle";
import { ValidationException } from "../common/exceptions/validation.exception";


@Injectable()
export class RoleService {

    constructor(@InjectModel('Role') private readonly RoleModel: Model<Role>) {}

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        const { name, level} = createRoleDto;

        if (!name|| !level) {
          throw new ValidationException('Missing required fields');
        }
        const createdRole = new this.RoleModel({ name,level});
        return await createdRole.save();
    }

    async getALLRolies(): Promise<Role[]> {
        return await this.RoleModel.find().exec();
    }
    async updateRole(updateRoleDto: UpdateRoleDto): Promise<Role> {
        const {id, ...updateData } = updateRoleDto;
        const updatedRole = await this.RoleModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedRole) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return updatedRole;
    }

    async deleteRole(id: string): Promise<boolean> {
        const deletedRole = await this.RoleModel.findByIdAndDelete(id);
        if (!deletedRole) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return !!deletedRole;
    }
    async searchRole(id:string): Promise<Role> {
        const rolies= await this.RoleModel.find({"_id":id}).exec();
        if (!rolies || rolies.length === 0) {
            throw new NotFoundException('Role not found');
          }
          return rolies[0];
    }
}
