import { hashSync, compareSync } from 'bcrypt';

export function hashPassword(plainTextPassword: string, saltRounds: number) {
    let hashedPassword: string = hashSync(plainTextPassword, saltRounds);
    return hashedPassword;
}

export function comparePassword(passwordToCompare: string, userPassword: string): boolean {
    let mach = compareSync(passwordToCompare, userPassword);
    return mach
}