import appConfig from "@app/config/appConfig";
import DatabaseHandler from "@app/database/DatabaseHandler";
import { signJWT } from "@app/utils/jwt";
import { comparePasswords, generateHash, isPasswordStrong } from "@app/utils/passwords";
import { jsonPayload, unautherized } from "@app/utils/payloads";
import { Response } from "express";
import { AuthenticatedRequest } from ".";



const isNewPasswordUnique = async (oldPasswordHashes: string[], newPassword: string) => {
    for (const oldPasswordHash of oldPasswordHashes) {
        const match = await comparePasswords(newPassword, oldPasswordHash);
        if (match) return false;
    }
    return true;
}



const updatePassword = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user || !req.user.username) res.status(401).json(unautherized)

    const { username } = req.user;

    const { oldPassword, newPassword, newPasswordRepeat } = req.body;

    if (!oldPassword)
        return res
            .status(400)
            .json(jsonPayload(false, "Old Password is required"));
    if (!newPassword)
        return res
            .status(400)
            .json(jsonPayload(false, "New Password is required"));
    if (!newPasswordRepeat)
        return res
            .status(400)
            .json(jsonPayload(false, "New Password Repeat is required"));

    if (newPassword !== newPasswordRepeat)
        return res
            .status(400)
            .json(jsonPayload(false, "Passwords don't match"));

    if (!isPasswordStrong(newPassword))
        return res
            .status(400)
            .json(jsonPayload(false, "New Password is not strong enough"));


    const dbResponseGetPasswords = await DatabaseHandler.getPassword(username);
    if (!dbResponseGetPasswords.success)
        return res.status(500).json(jsonPayload(false, "Couldn't not resolve username"))
    const currentPasswords = dbResponseGetPasswords.data;

    const isOldPasswordOk = await comparePasswords(oldPassword, currentPasswords[0].Password);
    if (!isOldPasswordOk)
        return res.status(400).json(jsonPayload(false, "Old Password is incorrect"));



    const oldPasswordsToCompare = currentPasswords.splice(0, appConfig.passwordHistory).map(v => v.Password);

    const isNewPasswordUniqueResult = await isNewPasswordUnique(oldPasswordsToCompare, newPassword);
    if (!isNewPasswordUniqueResult)
        return res.status(400)
            .json(jsonPayload(false, `Your new password is the same as one of your last ${appConfig.passwordHistory} passwords`));


    const hashedNewPassword = await generateHash(newPassword);
    const dbResponseUpdatePassword = await DatabaseHandler.updatePassword(username, hashedNewPassword);
    if (!dbResponseUpdatePassword.success)
        return res.status(500).json(jsonPayload(false, "Couldn't not resolve username"));


    const token = signJWT(username);
    return res.status(200).send(jsonPayload(true, { token }));

}

export default updatePassword;