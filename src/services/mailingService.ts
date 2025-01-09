// mailQueue.ts
import nodemailer from 'nodemailer';
import "dotenv/config";

export interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || "prabeersarkar098@gmail.com",
        pass: process.env.EMAIL_PASS || 'eftyaffbnbtkidmv',
      },
    });
  }

  async sendMail(mailOptions: MailOptions) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER || "prabeersarkar098@gmail.com",
        ...mailOptions
      });
      console.log('Email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

export const mailService = new MailService();
