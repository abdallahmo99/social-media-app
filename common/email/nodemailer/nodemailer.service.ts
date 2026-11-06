import { Transporter } from "nodemailer";
import { IMailProvider } from "../mail.interface";
import nodemailer from "nodemailer"
import { SEND_MAIL_PASS, SEND_MAIL_USER } from "../../../config";
import { injectable } from "tsyringe";

interface NodeMailerConfig{
    service : string,
    host : string, // host for gmail 
    port : number,
    auth : {
        user : string,
        pass : string
    }
}

@injectable()
export class NodeMailerProvider implements IMailProvider{
    private transporter: Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service : "gmail",
                host : "smtp.gmail.com", // host for gmail 
                port : 587,
                auth : {
                    user : SEND_MAIL_USER,
                    pass : SEND_MAIL_PASS
                }
        })
    }




    async send(to: string, subject: string, html: string): Promise<void>{
        await this.transporter.sendMail({to,subject,html})
    }
}