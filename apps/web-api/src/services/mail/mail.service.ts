import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your password
      },
    });
  }

  async sendMail(body: any) {
    const { to, email } = body;
    const fileContent = fs.readFileSync(
      __dirname + '/../../../src/assets/pageToHtml.html',
      'utf8',
    );
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: 'Forgot Password',
      text: 'This is a test email sent from NestJS',
      html: fileContent,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
