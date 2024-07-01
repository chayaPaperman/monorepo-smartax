
import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Res, Logger, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from '../../services/google-drive.service';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Response } from 'express';


@ApiTags('docs')
@Controller('docs')
export class GoogleDriveController {
  constructor(private readonly googleDriveService: GoogleDriveService) { }
  @Post()
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    required: true,
    type: 'multipart/form-data',
    schema: { type: 'object', properties: { file: { type: 'string', format: 'binary', }, clientId: { type: 'string', } }, },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('clientId') clientId: string, @Res() res: Response) {

    try {
      const response = await this.googleDriveService.uploadFile(file, clientId);
      return res.json(response);
    } catch (error) {
      console.error('Upload failed:', error);
      return res.status(500).json({ error: 'Upload failed' });
    }
  }

  @Get('file/:fileId')
  async getFile(@Param('fileId') fileId: string, @Res() res: Response) {
    try {
      const { stream, mimeType, name } = await this.googleDriveService.getFile(fileId);
      const encodedFilename = encodeURIComponent(name)
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodedFilename}`);
      stream.pipe(res);
    } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).json({ error: 'Failed to fetch file' });
    }
  }

  @Get('filedown/:fileId')
  async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
    try {
      const fileBuffer = await this.googleDriveService.getFileDown(fileId);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${fileId}`);
      res.send(fileBuffer);
    } catch (error) {
      console.error('Download failed:', error);
      res.status(500).send('Failed to download file');
    }
  }
  @Get('/link/:clientId/:fileName')
  async getLink(@Param('clientId') clientId: string, @Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const response = await this.googleDriveService.getLink(clientId, fileName);
      return res.json(response);
    } catch (error) {
      console.error('get file name failed:', error);
      return res.status(500).json({ error: 'get file name failed' });
    }
  }
  @ApiBody({ schema: { type: 'object', properties: { fileId: { type: 'string', }, email: { type: 'string', } } }, })
  @Put('permission')
  async setPermission(@Body('fileId') fileId: string, @Body('email') email: string, @Res() res: Response) {
    try {
      const response = await this.googleDriveService.setFilePermissions(fileId, email);
      return res.json(response);
    } catch (error) {
      console.error('get file name failed:', error);
      return res.status(500).json({ error: 'get file name failed' });
    }
  }
  @Get(':clientId')
  async getAllFiles(@Param('clientId') clientId: string, @Res() res: Response) {
    try {
      const response = await this.googleDriveService.getAllFiles(clientId);
      return res.json(response);
    } catch (error) {
      console.error('get file name failed:', error);
      return res.status(500).json({ error: 'get file name failed' });
    }
  }
}
