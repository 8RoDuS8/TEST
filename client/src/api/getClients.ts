import { protectedRequest } from "./requests";

export interface Client {
  Id: number;
  UserId: number;
  FullName: string;
  DateOfBirth: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
}



const url = "api/clients";

type ResponseType = { clients: Client[] };



const getClients = () =>
  async (onSuccess: (Data: ResponseType) => void, onError: (error: string) => void) => {
    try {
      const response = await protectedRequest<ResponseType>("GET", url);
      if (!response.success) return onError(response.error ?? "Internal Error");
      return onSuccess(response.data);
    } catch (e) {
      onError("Internal Error");
    }
  };

export default getClients;
