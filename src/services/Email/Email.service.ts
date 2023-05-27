import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { config } from "../../configs/config";
import { Transporter } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { IEmailService } from "./interface/emailService.interface";


export class EmailService implements IEmailService {

    private transportConfig: SMTPTransport.Options = {
        service: "Gmail",
        auth: {
            user: config.mailUser,
            pass: config.mailPass,
        },
    };


    private mailOptions: MailOptions = {
        from: config.mailUser
    };


    private transporter: Transporter;




    constructor(email: string, subject: string, body: string) {
        this.transporter = nodemailer.createTransport(this.transportConfig);
        this.mailOptions = {...this.mailOptions, to: email, subject, text: body}
    }



    send() {
        this.transporter.sendMail(this.mailOptions, (err, info)=>{
            console.log(err)
        });
    }


}
