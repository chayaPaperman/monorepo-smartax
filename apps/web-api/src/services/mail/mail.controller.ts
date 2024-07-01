import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail(@Body() t: string) {
    await this.mailService.sendMail(
      t, // The recipient's email
    );
    return { email: `email sent to ${t}` };
  }
}
