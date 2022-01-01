import appConfig from "@app/config/appConfig";
import { jsonPayload } from "@app/utils/payloads";
import { Request, Response } from "express";

const getPasswordStrength = (req: Request, res: Response) => {

  res.status(200).json(jsonPayload(true, { strength: appConfig.passwordStrengthConfig }));
}

export default getPasswordStrength;