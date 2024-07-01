import { Body, Controller, HttpException, HttpStatus, Post, UseFilters , Get, Query, Param, Put, Delete, ValidationPipe, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// 
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { CreateTaskDto, UpdateTaskDto } from '../../Models/dto/task.dto';
import { Task } from '../../Models/task.model';
import { ValidationException } from '../../common/exceptions/validation.exception';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { hashPasswordService } from '../../services/hash-password';
import { TokenService } from '../../services/jwt.service';
import { TaskService } from '../../services/task.service';

@ApiTags('tasks')
@UseFilters(HttpErrorFilter) 
@UseFilters(ValidationException)
@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService, private jwtToken: TokenService, private hashService: hashPasswordService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
    //   createUserDto.passwordHash = await this.hashService.hashPassword(createUserDto.passwordHash);
      const newTask = await this.taskService.createTask(createTaskDto);
      return newTask;
    } catch (error) {
        console.log(error);
      throw new HttpException(
        'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      
    }
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskService.findAll();
      return tasks;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

//   @Get('findOne/{id}')
//   @ApiOperation({ summary: 'Get a task by ID' })
// //   @ApiQuery({ name: 'id', required: true, description: 'The ID of the user to find' })
//   @ApiResponse({ status: 200, description: 'Return the task.' })
//   @ApiResponse({ status: 404, description: 'Task not found.' })
//   async findOne(@Param('id') id: string): Promise<Task> {
    
//     try {
//       const task = await this.taskService.findOne(id);
//       if (!task) {
//         throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
//       }
//       return task;
//     } catch (error) {
//       throw new HttpException(
//         'Failed to fetch task',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

  @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('findOne')
    async searchClient(@Body(new ValidationPipe())  body:{"id":string}): Promise<Task> {
        return await this.taskService.findOne(body.id);
    }

  @Put('update')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiBody({ type: UpdateTaskDto })
  async update(@Param()id:string,@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
    //   updateUserDto.passwordHash = await this.hashService.hashPassword(updateUserDto.passwordHash);
      const updateTask = await this.taskService.updateTask(id, updateTaskDto);
      if (!updateTask) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updateTask;
    } catch (error) {
      throw new HttpException(
        'Failed to update task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete a user by ID' })
//   @ApiQuery({ name: 'id', required: true, description: 'The ID of the user to find' })
  async delete(@Param('id') id: string): Promise<Task> {
   
    try {
      const deletedUser = await this.taskService.deleteTask(id);
      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return deletedUser;
    } catch (error) {
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: Express.Multer.File) : Promise<void> {
    const destinationPath = path.join(__dirname, '../../../uploads', image.originalname);
    console.log(destinationPath);
    
    fs.writeFileSync(destinationPath, image.buffer);
    console.log(`התמונה נשמרה ב: ${destinationPath}`);
  }

  // @Get(':filename')
  // async getImage(@Param('filename') filename: string, @Res() res: Response) {
  //   const imagePath = path.join(__dirname, '../../../uploads', filename);
  //   if (fs.existsSync(imagePath)) {
  //     res.sendFile(imagePath);
  //   } else {
  //     res.status(404).send('Image not found');
  //   }
  // }

  
  }

