import { Request, Response } from 'express';
import DatabaseHandler from '@app/database/DatabaseHandler';
import { comparePasswords } from '@app/utils/passwords';
import { signJWT } from '@app/utils/jwt';



const postLogin = async (req: Request, res: Response) => {
    try {

        const { username, password } = req.body;
        if (!username) return res.status(400).json({ success: false, error: "Username is required" });
        if (!password) return res.status(400).json({ success: false, error: "Password is required" });



        const dbResponse = await DatabaseHandler.getPassword(username);

        if (!dbResponse.success) return res.status(401).json({ success: false, error: "Username or password invalid" });


        const savedHashedPassword = dbResponse.data[0].Password;
        const isPasswordOk = await comparePasswords(password, savedHashedPassword);
        if (!isPasswordOk) return res.status(401).json({ success: false, error: "Username or password invalid" });


        const token = signJWT(username);
        res.status(200).json({ success: true, data: { token } });

    } catch (e) {
        res.status(500).send({ success: false, error: "internal_server_error" });
    }

};
export default postLogin;
