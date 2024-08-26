import jwt, { JwtPayload } from "jsonwebtoken";

export function signJwtAccessToken(payload: string | Buffer | object, options = {
    expiresIn: '1h'
}) {
    const secretKey = process.env.SECRET_KEY!;
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

export function verifyJwt(token: string) {
    try {
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey!);
        return decoded;
    } catch (err) {
        console.log(err);
        return null;
    }
}