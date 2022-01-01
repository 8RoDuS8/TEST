import { Request, Response } from "express";
import validator from 'validator';
import { generateHash, isPasswordStrong } from "@app/utils/passwords";
import DatabaseHandler from '@app/database/DatabaseHandler';
import { signJWT } from '@app/utils/jwt';
import { internalServerError, jsonPayload } from "@app/utils/payloads";




const validateEmail = (email: string) => validator.isEmail(email);

// uppercase,lowercase,digits 6-20 chars
const validateUsername = (username: string) => /^[a-zA-Z0-9]{6,20}$/g.test(username);



const postRegister = async (req: Request, res: Response) => {

    try {

        const { email, username, password } = req.body;

        if (!validateEmail(email))
            return res.status(400).json(jsonPayload(false, "Invalid Email"));
        try {

            if (!(await DatabaseHandler.checkEmailValid(email)).success)
                return res.status(400).json(jsonPayload(false, "Email is taken"));
        } catch (e) {
            return res.status(400).json(jsonPayload(false, "Invalid Email "))
        }

        if (!validateUsername(username))
            return res.status(400).json(jsonPayload(false, "Invalid Username"));

        if (!(await DatabaseHandler.checkUsernameValid(username)).success)
            return res.status(400).json(jsonPayload(false, "Username is taken"));

        if (!isPasswordStrong(password))
            return res.status(400).json(jsonPayload(false, "Password is not strong enough"));


        const hashedPassword = await generateHash(password);

        const dbResult = await DatabaseHandler.registerUser(email, username, hashedPassword);

        if (!dbResult.success)
            return res.status(500).json(jsonPayload(false, "Failed to create user"));


        const token = signJWT(username);

        res.status(200).json(jsonPayload(true, { token }));


    } catch (e) {
        res.status(500).json(internalServerError);
    }
}


export default postRegister;