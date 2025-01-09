import { Request, Response, NextFunction } from 'express';
import { mailService, MailOptions } from '../services/mailingService';

const sendMail = (req: any, res: any, next: NextFunction) => {
  req.queueMail = async (mailOptions: MailOptions) => {
    try {
      const result = await mailService.sendMail(mailOptions);
      console.log('Email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
  next();
};

export default sendMail;
