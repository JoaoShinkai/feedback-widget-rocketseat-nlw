import * as dotenv from 'dotenv';
import 'dotenv/config';
import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mailAdapter';
dotenv.config();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user:process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'João S <joaogabriel1412@gmail.com>',
            subject: subject,
            html: body
        })
    }
}