import DatabaseHandler from "@app/database/DatabaseHandler";
import { AuthenticatedRequest } from "@app/types/interfaces";
import { unautherized, jsonPayload } from "@app/utils/payloads";
import { Response } from "express";

const getClients = async (req: AuthenticatedRequest, res: Response) => {


  if (!req.user?.username) res.status(401).json(unautherized)

  const { username } = req.user;

  const dbResponse = await DatabaseHandler.getUserClients(username)

  if (!dbResponse.success) return res.status(400).json(jsonPayload(false, "Failed to get user's clients."));

  return res.status(200).send(jsonPayload(true, { clients: dbResponse.data }));

}

export default getClients;
