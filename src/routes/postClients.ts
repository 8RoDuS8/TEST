import DatabaseHandler from "@app/database/DatabaseHandler";
import { comparePasswords, isPasswordStrong } from "@app/utils/passwords";
import {  jsonPayload, unautherized } from "@app/utils/payloads";
import { Response } from "express";
import { AuthenticatedRequest } from ".";



const isNewPasswordUnique = async (oldPasswordHashes: string[], newPassword: string) => {
  for (const oldPasswordHash of oldPasswordHashes) {
    const match = await comparePasswords(newPassword, oldPasswordHash);
    if (match) return false;
  }
  return true;
}



const postClients = async (req: AuthenticatedRequest, res: Response) => {

  if (!req.user?.username) res.status(401).json(unautherized)

  const { username } = req.user;
  const {
    fullname,
    dob,
    email,
    phoneNumber,
    address,
  } = req.body

  if (!(fullname && dob && email && phoneNumber && address))
    return res
      .status(400)
      .json(jsonPayload(false, "Missing fields in request"));


  const dbResponse = await DatabaseHandler.registerClient(username, req.body)

  if (!dbResponse.success) return res.status(400).json(jsonPayload(false, "Failed to create client"));

  return res.status(200).send(jsonPayload(true, dbResponse.data));

}

export default postClients;