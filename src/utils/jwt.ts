import appConfig from '@app/config/appConfig';
import jwt from 'jsonwebtoken';

const EXPIRE = "7d";

const signJWT = (username: string) =>
    jwt.sign({
        username,
        authenticated: true
    }, appConfig.jwtConfig.key, { expiresIn: EXPIRE });

export {
    signJWT
}