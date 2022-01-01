import { jsonPayload, unautherized } from "@app/utils/payloads";
import { Response } from "express";
import { AuthenticatedRequest } from ".";


const getAuth = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    if (!user) res.status(401).json(unautherized);
    res.status(200).json(jsonPayload(true, user));
}
export default getAuth;