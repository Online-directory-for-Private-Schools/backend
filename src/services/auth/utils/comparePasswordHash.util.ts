import bcrypt from "bcrypt"


export default async function comparePasswordHashUtil(password: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hash);

    return isValid;
}