import jwt from 'jsonwebtoken'
import { jsonPayload } from "@app/utils/payloads";
import { NextFunction, Request, Response } from "express";
import appConfig from '@app/config/appConfig';

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { authorization } = req.headers;

        if (!authorization) throw new Error();

        const [Bearer, token] = authorization.split(" ");

        const isJWTOk = jwt.verify(token, appConfig.jwtConfig.key);
        if (!token && !isJWTOk) throw new Error();

        const decoded = jwt.decode(token, { json: true });
        req.user = {
            username: decoded.username,
            authenticated: decoded.authenticated
        };
        next();



        // res.status(200).json(jsonPayload(true, decoded));
    } catch (e) {
        console.log(e);
        res.status(401).json(jsonPayload(false, "Unautherized"));
    }
}

export default authorizationMiddleware