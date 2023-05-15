import crypto from 'crypto';

export default function generateVerificationCode(): string {
    const code = crypto.randomBytes(4).toString("hex").toUpperCase()

    return code;
}