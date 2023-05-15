import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { config } from "../../configs/config";
import { Transporter } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export class EmailService {

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



    async send() {
        await this.transporter.sendMail(this.mailOptions);
    }


}