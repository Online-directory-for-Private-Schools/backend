import { User } from "../../db/entities/UserEntity";
import { EmailService } from "./Email.service";

export class EmailFactory {
    private static _instance: EmailFactory;

    static get Instance() {
        if (!this._instance) {
            this._instance = new EmailFactory();
        }

        return this._instance;
    }

    private constructor() {}

    createWelcomeEmail(user: User): EmailService {

        const subject = `Welcome to Course-Seeker`;

        const body = `Dear ${user.email}, Thank you for creating your account on CourseSeeker. We hope you'll find everything you need with us.`

        const email = new EmailService(user.email, subject, body);

        return email;
    }

    createVerificationEmail(user: User, code: string): EmailService {
        const subject = `Verify your CourseSeeker account`
        const body = `Dear ${user.email},\nYour verification code is ${code}`;

        const email = new EmailService(user.email, subject, body);

        return email;
    }

    createNewsletterEmail(user: User): EmailService {
        throw new Error("not implemented");
    }

    createNotificationEmail(user: User): EmailService {
        throw new Error("not implemented");
    }
}
