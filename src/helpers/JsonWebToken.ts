import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv'

export function createToken(userId: string | number): string {
    config();
    let token: string = jwt.sign({ userId }, String(process.env.DOTENV_WEB_TOKEN_BASE));
    return token;
}

export function verifyToken(userToken: string): Promise<JwtPayload> {
    config();
    return new Promise<JwtPayload>((Resolve, Rejected) => {
        jwt.verify(userToken, String(process.env.DOTENV_WEB_TOKEN_BASE), (err, payload) => {
            if (err) {
                Rejected({ Error: "Invalid token" })
            } else {
                Resolve({ ...payload })
            }
        })
    })
}