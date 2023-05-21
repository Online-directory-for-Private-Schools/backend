import bcrypt from 'bcrypt'

export default async function hashPasswordUtil(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}